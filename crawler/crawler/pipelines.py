import json
import requests
import hashlib
import math
import mimetypes
import os
import re
import time
from datetime import datetime
from urllib.parse import unquote, urljoin
from google.cloud import aiplatform

from itemadapter import ItemAdapter
from bs4 import BeautifulSoup
import html2text
from w3lib.html import remove_tags
from google.cloud import aiplatform_v1

from crawler.items import ArticleItem
from crawler.config import (
    UNIFEED_CMS_GRAPHQL_HOST,
    UNIFEED_CMS_GRAPHQL_PORT,
    UNIFEED_CMS_GRAPHQL_ENDPOINT,
    UNIFEED_CMS_GRAPHQL_TOKEN
)
from crawler.graphql_queries.article_service import CREATE_ARTICLE, IS_ARTICLE_EXIT

# ------------ CONFIG ------------
SPRING_BOOT_URL = "http://localhost:8080/v1/summary/article"

ELASTICSEARCH_HOST = os.environ.get("ELASTICSEARCH_HOST", "http://localhost:9200")
ELASTICSEARCH_INDEX = os.environ.get("ELASTICSEARCH_INDEX", "article_embeddings")

DEFAULT_USER_AGENT = (
    "Mozilla/50 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

COSINE_THRESHOLD = 0.92 
DEFAULT_TIMEOUT = 30 

# ------------ UTILS ------------
def content_hash(title: str, markdown: str) -> str:
    t = (title or "").strip()
    c = (markdown or "").strip()
    return hashlib.sha256((t + "\n" + c).encode("utf-8")).hexdigest()

def cosine(a: list[float], b: list[float]) -> float:
    if not a or not b or len(a) != len(b):
        return -1.0
    dot = sum(x*y for x, y in zip(a, b))
    na = math.sqrt(sum(x*x for x in a)) or 1e-9
    nb = math.sqrt(sum(y*y for y in b)) or 1e-9
    return dot/(na*nb)

# ------------ ES CLIENT ------------
class ElasticsearchClient:
    """Client tối giản cho index và kNN dedup."""
    def __init__(self, host: str, index: str):
        self.host = host.rstrip('/')
        self.index = index

    def store_embedding(self, article_id: str, embedding: list[float], content_url: str, logger):
        """POST doc vào ES với id = article_id."""
        doc = {
            "article_id": article_id,
            "url": content_url,
            "embedding": embedding,
            "timestamp": int(time.time())
        }
        try:
            # --- LOGGING: Chuẩn bị POST vector ---
            logger.info(f"STEP 7.1: Posting vector (dim={len(embedding)}) for Article ID {article_id} to ES index {self.index}.")
            
            response = requests.post(
                f"{self.host}/{self.index}/_doc/{article_id}",
                headers={"Content-Type": "application/json"},
                data=json.dumps(doc),
                timeout=DEFAULT_TIMEOUT
            )
            response.raise_for_status()
            logger.info(f"STEP 7.1 Success: Stored embedding for ID {article_id} in Elasticsearch.")
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"!!! Error storing embedding to Elasticsearch: {e}")
            return None

    def find_neighbors(self, query_vec: list[float], k: int = 3):
        """
        Tìm k láng giềng gần nhất dùng script_score cosineSimilarity.
        Trả về list [{'article_id', 'embedding', 'score'~cosine}, ...]
        """
        try:
            body = {
                "size": k,
                "query": {
                    "script_score": {
                        "query": {"match_all": {}},
                        "script": {
                            "source": "cosineSimilarity(params.q, 'embedding') + 1.0",
                            "params": {"q": query_vec}
                        }
                    }
                },
                "_source": ["article_id", "url", "embedding"]
            }
            res = requests.post(
                f"{self.host}/{self.index}/_search",
                headers={"Content-Type": "application/json"},
                data=json.dumps(body),
                timeout=DEFAULT_TIMEOUT
            )
            res.raise_for_status()
            hits = res.json().get("hits", {}).get("hits", [])
            out = []
            for h in hits:
                src = h.get("_source", {})
                out.append({
                    "article_id": src.get("article_id"),
                    "embedding": src.get("embedding"),
                    "score": (h.get("_score", 0.0) - 1.0)  #vì +1.0 trong script
                })
            return out
        except requests.exceptions.RequestException as e:
            print(f"!!! Error ES kNN search: {e}")
            return []


class VertexAIEmbedder:
    def __init__(self, project_id: str, location: str = "us-central1",
                 model_name: str = "textembedding-gecko@001"):
        self.project_id = project_id
        self.location = location
        self.model_name = model_name

    def embed(self, text: str) -> list[float]:
        if not text or not text.strip():
            return []
        # Chuyển thành client v1 (vì client v1 không có sẵn trong đoạn code này)
        client = aiplatform_v1.PredictionServiceClient() 
        endpoint = (
            f"projects/{self.project_id}"
            f"/locations/{self.location}"
            f"/publishers/google/models/{self.model_name}"
        )
        # cắt text nếu quá dài để an toàn
        instance = {"content": text[:8000]}
        # có thể truyền timeout (giây) để tránh treo
        try:
            response = client.predict(endpoint=endpoint, instances=[instance], timeout=60.0)
            vec = list(response.predictions[0]["embeddings"]["values"])
            return vec
        except Exception as e:
            print(f"❌ Error during Vertex AI embedding: {e}")
            return []
            
# ------------ GRAPHQL QUERY DEDUP HASH ------------
IS_ARTICLE_EXIST_BY_HASH = """
query ArticleByHash($content_hash: String!) {
  articles(filters: { content_hash: { eq: $content_hash }}) { 
    data { 
      id 
    } 
  }
}
"""

# ========== PIPELINE 1: CLEAN + SUMMARIZE ==========
class ArticlePipeline:

    def _clean_title(self, adapter):
        title = adapter.get('title', '')
        cleaned_title = title.replace('\r\n', ' ').strip()
        adapter['title'] = cleaned_title

    def _summarize_text_ai(self, adapter, spider):
        """Gọi Spring Boot để tóm tắt nội dung (Gemini)."""
        article_content = adapter.get('content', '')
        if not article_content:
            adapter["summary"] = "Nội dung trống, không thể tóm tắt."
            return
        try:
            payload = {"articleContent": article_content}
            response = requests.post(
                SPRING_BOOT_URL,
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=45
            )
            if response.status_code == 200:
                summary_data = response.json()
                adapter["summary"] = summary_data.get("summary", "Lỗi: Không tìm thấy trường 'summary' từ Spring AI.")
                spider.logger.info(f"Tóm tắt AI thành công cho: {adapter.get('title')}")
            else:
                adapter["summary"] = f"Lỗi HTTP {response.status_code} từ Spring AI."
                spider.logger.warning(f"Lỗi tóm tắt AI: {response.status_code}. Chi tiết: {response.text}")
        except requests.exceptions.RequestException as e:
            adapter["summary"] = f"Lỗi kết nối dịch vụ Spring Boot: {e}"
            spider.logger.error(f"Lỗi kết nối API tóm tắt: {e}")

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        self._clean_title(adapter)
        return item

# ========== PIPELINE 2: CMS + DEDUP + EMBED + PERSIST ==========
class CMSPipeline:

    def __init__(self) -> None:
        self._graphql_url_endpoint = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/{UNIFEED_CMS_GRAPHQL_ENDPOINT}'
        self._token = UNIFEED_CMS_GRAPHQL_TOKEN
        self._article_pipeline = ArticlePipeline()

        self.embedder = VertexAIEmbedder(
            project_id=os.environ.get("VERTEX_PROJECT_ID"),
            location=os.environ.get("VERTEX_LOCATION"),
            model_name=os.environ.get("VERTEX_EMBED_MODEL")
        )

        self.es_client = ElasticsearchClient(
            host=os.environ.get("ELASTICSEARCH_HOST", "http://localhost:9200"),
            index=os.environ.get("ELASTICSEARCH_INDEX", "news")
        )

    # ----------- MAIN FLOW (ảnh 1→7) -----------
    def process_item(self, item, spider) -> ArticleItem:
        adapter = ItemAdapter(item)
        spider.logger.info(f"--- 🏁 START Processing Article: {adapter.get('external_url')} ---")

        # Quick dedup theo URL (tiết kiệm tài nguyên)
        if self._is_article_exist(adapter.get('external_url')):
            spider.logger.info(f"STEP 1: Duplicate by URL skipped: {adapter.get('external_url')}")
            return item
        spider.logger.info("STEP 1: Passed URL Dedup check.")

        # Validate metadata phục vụ bước (7)
        department_source_url = adapter.get('department_source_url', '')
        strapi_url = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}'
        
        department_source_id = adapter.get('department_source_id')
        department_source_name = adapter.get('department_source_name')
        if not department_source_id:
            spider.logger.warning(f"Không tìm thấy department với key: {department_source_name}")
            return item

        category_id = adapter.get('category_id')
        category_name = adapter.get('category_name')
        if not category_id:
            spider.logger.warning(f"Không tìm thấy category với key: {category_name} và department: {department_source_name}")
            return item
            
        # ---- Upload FILES (pdf/doc/zip/..)
        extensions = ['.pdf', '.docx', '.xlsx', '.doc', '.xls', '.zip', '.ppt', '.mp4']
        file_urls = self.extract_file_urls(adapter, extensions)
        spider.logger.info("ℹSTEP 2: Starting file and image processing (Upload to Strapi)...")

        if file_urls:
            for file_url in file_urls:
                try:
                    file_path = self.download_file(file_url, department_source_url)
                    new_url = self.upload_file_to_strapi(file_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN)
                    if new_url:
                        self.replace_all_variants(adapter, file_url, new_url)
                except Exception as e:
                    spider.logger.error(f"Lỗi xử lý file {file_url}: {e}")

        # ---- Upload IMAGES
        img_urls = self.extract_image_urls(adapter)
        if img_urls:
            for img_url in img_urls:
                try:
                    img_path = self.download_file(img_url, department_source_url)
                    new_img_url = self.upload_file_to_strapi(img_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN)
                    if new_img_url and isinstance(adapter['content'], str):
                        self.replace_all_variants(adapter, img_url, new_img_url)

                    name_img_url = unquote(img_url.split('/')[-1]).split('?')[0]
                    thumbnail_tail = adapter.get('thumbnail', '').split('/')[-1].split('?')[0]
                    if thumbnail_tail == name_img_url and new_img_url:
                        adapter['thumbnail'] = new_img_url
                    elif thumbnail_tail == "img_default.png":
                        adapter['thumbnail'] = "https://iuh.edu.vn/templates/2015/image/img_default.png"
                except Exception as e:
                    spider.logger.error(f"Lỗi xử lý ảnh {img_url}: {e}")
        else:
            adapter['thumbnail'] = urljoin(adapter['department_source_url'], adapter['thumbnail'])
        
        spider.logger.info("STEP 2: File and image processing complete.")

        # (3) Làm sạch & Chuẩn hoá: clean title + HTML -> Markdown
        self._article_pipeline._clean_title(adapter)
        self._convert_html_to_markdown(adapter)
        spider.logger.info("STEP 3: Content cleaned and converted to Markdown.")

        # (4) Sinh vector ngữ nghĩa (Embedding)
        final_content = adapter.get('content') or ''
        embedding_vector = None
        if final_content:
            spider.logger.info("STEP 4: Generating embedding vector via Vertex AI...")
            embedding_vector = self.embedder.embed(final_content)
            if embedding_vector:
                spider.logger.info(f"STEP 4: Embedding vector generated successfully (dims: {len(embedding_vector)}).")
            else:
                spider.logger.warning("STEP 4: Failed to generate embedding vector.")
        
        # (5) Phát hiện & loại bỏ trùng lặp
        spider.logger.info("STEP 5: Starting Dedup checks...")
        
        # 5.1 Exact dedup: content_hash
        c_hash = content_hash(adapter.get('title'), final_content)
        if self._is_article_exist_by_hash(c_hash):
            spider.logger.info(f"STEP 5.1: Duplicate by content_hash skipped.")
            return item
        spider.logger.info("STEP 5.1: Passed Hash Dedup check.")

        # 5.2 Semantic dedup: so cosine với hàng xóm gần nhất trong ES
        if embedding_vector:
            spider.logger.info("STEP 5.2: Searching for nearest neighbors in Elasticsearch...")
            neighbors = self.es_client.find_neighbors(embedding_vector, k=3) or []
            is_duplicate_semantic = False
            for nb in neighbors:
                cos_sim = 0.0
                if nb.get("embedding"):
                    cos_sim = cosine(embedding_vector, nb["embedding"])
                else:
                    cos_sim = nb.get("score", 0.0)

                if cos_sim >= COSINE_THRESHOLD:
                    spider.logger.info(f"❌ STEP 5.2: Duplicate by cosine (score={cos_sim:.4f} ≥{COSINE_THRESHOLD}) with article_id={nb.get('article_id')}).")
                    is_duplicate_semantic = True
                    break
            
            if is_duplicate_semantic:
                 return item
            spider.logger.info("STEP 5.2: Passed Semantic Dedup check.")

        # (6) Tóm tắt nội dung (sau khi chắc chắn không trùng)
        spider.logger.info("⏳ STEP 6: Calling Spring AI service for summarization...")
        self._summarize_text_ai(adapter, spider) 
        if adapter.get("summary") and "Lỗi" not in adapter.get("summary"):
            spider.logger.info("STEP 6: Summarization complete.")
        else:
            spider.logger.warning(f"STEP 6: Summarization failed or empty. Summary: {adapter.get('summary')}")
            # Fallback summary logic
            adapter["summary"] = (final_content[:400] + '...') if len(final_content) > 400 else final_content

        # (7) Lưu Article (Strapi) + Index Embedding (ES)
        spider.logger.info("STEP 7: Creating Article in CMS (Strapi)...")
        article_id = self._create_article_with_hash(adapter, category_id, c_hash)
        
        if article_id and embedding_vector:
            if len(embedding_vector) == 768:
                self.es_client.store_embedding(
                    article_id=article_id,
                    embedding=embedding_vector,
                    content_url=adapter.get('external_url'),
                    logger=spider.logger 
                )
            else:
                spider.logger.warning(f"Embedding dim != 768: {len(embedding_vector)}. Skipped ES index.")
        elif not article_id:
            spider.logger.error("STEP 7: Failed to create article in CMS. Skipping ES indexing.")
        else:
             spider.logger.info("STEP 7: Article created successfully but no embedding vector to index.")


        spider.logger.info(f"---FINISHED Processing Article: {adapter.get('title')} ---")
        return item

    # ----------- HELPERS -----------
    def _summarize_text_ai(self, adapter, spider):
        """Wrapper để gọi ArticlePipeline summarize (cho đúng vị trí Step 6)."""
        ap = self._article_pipeline
        ap._summarize_text_ai(adapter, spider)

    def _convert_html_to_markdown(self, adapter):
        content = adapter.get('content', '')
        h = html2text.HTML2Text()
        h.ignore_links = False
        h.body_width = 0 # không wrap dòng
        markdown_content = h.handle(content)
        adapter['content'] = markdown_content

    def extract_image_urls(self, adapter):
        content = adapter.get('content', '')
        soup = BeautifulSoup(content, 'html.parser')
        img_tags = soup.find_all('img')
        if img_tags:
            img_urls = [img.get('src') for img in img_tags if img.get('src')]
            return img_urls
        return None

    def extract_file_urls(self, adapter, extensions=None):
        content = adapter.get('content', '')
        soup = BeautifulSoup(content, 'html.parser')
        if extensions is None:
            extensions = ['.pdf', '.docx', '.xlsx', '.doc', '.xls', '.zip', '.ppt', '.mp4']
        patt = re.compile(r'(' + '|'.join(map(re.escape, extensions)) + r')(\?|$)', re.IGNORECASE)
        file_urls = [a['href'] for a in soup.find_all('a', href=True) if patt.search(a['href'])]
        return file_urls if file_urls else None

    def upload_file_to_strapi(self, file_path, strapi_url, token):
        try:
            with open(file_path, "rb") as file:
                file_name = os.path.basename(file_path)
                mime_type, _ = mimetypes.guess_type(file_path)
                mime_type = mime_type or "application/octet-stream"

                res = requests.post(
                    f"{strapi_url}/api/upload",
                    files={"files": (file_name, file, mime_type)},
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=DEFAULT_TIMEOUT
                )
                res.raise_for_status()
                response_data = res.json()
                if isinstance(response_data, list) and response_data:
                    file_url = response_data[0].get("url")
                    return f"{strapi_url}{file_url}" if file_url else None
                return None
        except requests.exceptions.RequestException as e:
            print(f"Lỗi khi upload file lên Strapi: {e}")
            return None
        finally:
            try:
                os.remove(file_path)
            except OSError:
                pass

    def download_file(self, file_url, base_url, save_dir='downloads', user_agent=DEFAULT_USER_AGENT, referer=None):
        full_url = urljoin(base_url, file_url)
        headers = {"User-Agent": user_agent, "Referer": referer or base_url}
        response = requests.get(full_url, headers=headers, allow_redirects=True, timeout=DEFAULT_TIMEOUT)
        ctype = response.headers.get("Content-Type", "").lower()
        if response.ok and "text/html" not in ctype:
            os.makedirs(save_dir, exist_ok=True)
            file_name = unquote(full_url.split('/')[-1]).split('?')[0] # bỏ query
            file_path = os.path.join(save_dir, file_name)
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print("File saved to:", file_path)
            return file_path
        else:
            raise Exception(f"Failed to download file from {full_url} (ctype={ctype}, status={response.status_code})")

    def replace_all_variants(self, adapter, old_url, new_url):
        content = adapter.get('content', '')
        department_source_url = adapter.get('department_source_url', '')

        variants = [
            old_url,
            unquote(old_url),
            urljoin(department_source_url, old_url),
            urljoin(department_source_url, unquote(old_url)),
            old_url.split('?')[0],
            unquote(old_url).split('?')[0]
        ]
        for variant in variants:
            if variant and (variant in content):
                content = content.replace(variant, new_url)
        adapter['content'] = content

    def _create_article_with_hash(self, adapter, category_id, c_hash: str) -> str | None:
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Authorization': f'Bearer {self._token}'},
            timeout=DEFAULT_TIMEOUT,
            json={
                'query': CREATE_ARTICLE, 
                'variables': {
                    'title': adapter.get('title'),
                    'content': adapter.get('content'),
                    'summary': adapter.get('summary'),
                    'thumbnail': adapter.get('thumbnail'),
                    'external_slug': adapter.get('external_slug'),
                    'external_url': adapter.get('external_url'),
                    'external_publish_date': adapter.get('external_publish_date'),
                    'categoryId': category_id,
                    'content_hash': c_hash
                }
            }
        )
        try:
            if response.status_code == 200:
                data = response.json()
                if 'errors' in data:
                    print("GraphQL errors:", data['errors'])
                    return None
                article_id = data.get('data', {}).get('createArticle', {}).get('documentId')
                print(f"Article created successfully with ID: {article_id}")
                return article_id
            else:
                print(f"Request thất bại: {response.status_code} {response.text}")
                return None
        except Exception as e:
            print("Exception occurred while creating article:", e)
            return None

    def _is_article_exist(self, external_url):
        try:
            response = requests.post(
                self._graphql_url_endpoint,
                headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
                json={'query': IS_ARTICLE_EXIT, 'variables': {'external_url': external_url}},
                timeout=DEFAULT_TIMEOUT
            )
            response.raise_for_status()
            data = response.json()
            return len(data.get('data', {}).get('articles', [])) > 0
        except requests.exceptions.RequestException as e:
            print(f"exist_by_external_url failed: {e}")
            return False

    def _is_article_exist_by_hash(self, c_hash: str) -> bool:
        try:
            r = requests.post(
                self._graphql_url_endpoint,
                headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
                json={'query': IS_ARTICLE_EXIST_BY_HASH, 'variables': {'content_hash': c_hash}},
                timeout=DEFAULT_TIMEOUT
            )
            r.raise_for_status()
            data = r.json()
            items = data.get('data', {}).get('articles', {}).get('data', []) or []
            return len(items) > 0
        except requests.exceptions.RequestException as e:
            print(f"Hash dedup check failed: {e}")
            return False