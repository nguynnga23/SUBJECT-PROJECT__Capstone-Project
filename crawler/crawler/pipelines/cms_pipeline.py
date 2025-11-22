# crawler/pipelines/cms_pipeline.py

import json
import os
import re
import time
import mimetypes
from datetime import datetime
from urllib.parse import unquote, urljoin

import requests
from bs4 import BeautifulSoup
import html2text
from itemadapter import ItemAdapter

from crawler.items import ArticleItem
from crawler.config import (
    UNIFEED_CMS_GRAPHQL_HOST,
    UNIFEED_CMS_GRAPHQL_PORT,
    UNIFEED_CMS_GRAPHQL_ENDPOINT,
    UNIFEED_CMS_GRAPHQL_TOKEN,
)
from crawler.graphql_queries.article_service import CREATE_ARTICLE, IS_ARTICLE_EXIT
from crawler.utils.text_utils import content_hash, cosine
from crawler.services.elasticsearch_client import (
    ElasticsearchClient,
    DEFAULT_TIMEOUT,
)
from crawler.services.vertex_ai_embedder import VertexAIEmbedder
from crawler.pipelines.article_pipeline import ArticlePipeline

COSINE_THRESHOLD = 0.92
DEFAULT_USER_AGENT = (
    "Mozilla/50 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

# GraphQL query check hash
IS_ARTICLE_EXIST_BY_HASH = """
query ArticleByHash($content_hash: String!) {
  articles(filters: { content_hash: { eq: $content_hash }}) {
    data {
      id
    }
  }
}
"""


class CMSPipeline:
    """
    Pipeline 2:
      - upload file/image lên Strapi
      - convert HTML -> Markdown
      - generate embedding
      - dedup (URL, hash, cosine)
      - summarize
      - create Article + push embedding to ES
    """

    def __init__(self) -> None:
        self._graphql_url_endpoint = (
            f"http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/"
            f"{UNIFEED_CMS_GRAPHQL_ENDPOINT}"
        )
        self._token = UNIFEED_CMS_GRAPHQL_TOKEN
        self._article_pipeline = ArticlePipeline()

        self.embedder = VertexAIEmbedder()

        self.es_client = ElasticsearchClient(
            host=os.environ.get("ELASTICSEARCH_HOST", "http://localhost:9200"),
            index=os.environ.get("ELASTICSEARCH_INDEX", "news"),
        )

    # ---------------- MAIN FLOW ----------------
    def process_item(self, item, spider) -> ArticleItem:
        adapter = ItemAdapter(item)
        spider.logger.info(
            f"--- 🏁 START Processing Article: {adapter.get('external_url')} ---"
        )

        # 1. Dedup theo URL
        if self._is_article_exist(adapter.get("external_url")):
            spider.logger.info(
                f"STEP 1: Duplicate by URL skipped: {adapter.get('external_url')}"
            )
            return item
        spider.logger.info("STEP 1: Passed URL Dedup check.")

        department_source_url = adapter.get("department_source_url", "")
        strapi_url = f"http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}"

        department_source_id = adapter.get("department_source_id")
        department_source_name = adapter.get("department_source_name")
        if not department_source_id:
            spider.logger.warning(
                f"Không tìm thấy department với key: {department_source_name}"
            )
            return item

        category_id = adapter.get("category_id")
        category_name = adapter.get("category_name")
        if not category_id:
            spider.logger.warning(
                f"Không tìm thấy category với key: {category_name} "
                f"và department: {department_source_name}"
            )
            return item

        # 2. Upload files
        extensions = [".pdf", ".docx", ".xlsx", ".doc", ".xls", ".zip", ".ppt", ".mp4"]
        file_urls = self.extract_file_urls(adapter, extensions)
        spider.logger.info(
            "ℹ STEP 2: Starting file and image processing (Upload to Strapi)..."
        )

        if file_urls:
            for file_url in file_urls:
                try:
                    file_path = self.download_file(
                        file_url, department_source_url
                    )
                    new_url = self.upload_file_to_strapi(
                        file_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN
                    )
                    if new_url:
                        self.replace_all_variants(adapter, file_url, new_url)
                except Exception as e:
                    spider.logger.error(f"Lỗi xử lý file {file_url}: {e}")

        # Upload images
        img_urls = self.extract_image_urls(adapter)
        if img_urls:
            for img_url in img_urls:
                try:
                    img_path = self.download_file(
                        img_url, department_source_url
                    )
                    new_img_url = self.upload_file_to_strapi(
                        img_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN
                    )
                    if new_img_url and isinstance(adapter.get("content"), str):
                        self.replace_all_variants(adapter, img_url, new_img_url)

                    name_img_url = unquote(img_url.split("/")[-1]).split("?")[0]
                    thumbnail_tail = (
                        adapter.get("thumbnail", "").split("/")[-1].split("?")[0]
                    )
                    if thumbnail_tail == name_img_url and new_img_url:
                        adapter["thumbnail"] = new_img_url
                    elif thumbnail_tail == "img_default.png":
                        adapter[
                            "thumbnail"
                        ] = "https://iuh.edu.vn/templates/2015/image/img_default.png"
                except Exception as e:
                    spider.logger.error(f"Lỗi xử lý ảnh {img_url}: {e}")
        else:
            adapter["thumbnail"] = urljoin(
                adapter.get("department_source_url", ""),
                adapter.get("thumbnail", ""),
            )

        spider.logger.info("STEP 2: File and image processing complete.")

        # 3. Clean title + HTML -> Markdown
        self._article_pipeline._clean_title(adapter)
        self._convert_html_to_markdown(adapter)
        spider.logger.info("STEP 3: Content cleaned and converted to Markdown.")

        # 4. Embedding
        final_content = adapter.get("content") or ""
        embedding_vector = None
        if final_content:
            spider.logger.info("STEP 4: Generating embedding vector via Vertex AI...")
            embedding_vector = self.embedder.embed(final_content)
            if embedding_vector:
                spider.logger.info(
                    f"STEP 4: Embedding vector generated successfully (dims: {len(embedding_vector)})."
                )
            else:
                spider.logger.warning("STEP 4: Failed to generate embedding vector.")

        # 5. Dedup: hash + cosine
        spider.logger.info("STEP 5: Starting Dedup checks...")

        c_hash = content_hash(adapter.get("title"), final_content)
        if self._is_article_exist_by_hash(c_hash):
            spider.logger.info("STEP 5.1: Duplicate by content_hash skipped.")
            return item
        spider.logger.info("STEP 5.1: Passed Hash Dedup check.")

        if embedding_vector:
            spider.logger.info(
                "STEP 5.2: Searching for nearest neighbors in Elasticsearch..."
            )
            neighbors = self.es_client.find_neighbors(embedding_vector, k=3) or []
            is_duplicate_semantic = False

            for nb in neighbors:
                if nb.get("embedding"):
                    cos_sim = cosine(embedding_vector, nb["embedding"])
                else:
                    cos_sim = nb.get("score", 0.0)

                if cos_sim >= COSINE_THRESHOLD:
                    spider.logger.info(
                        f"❌ STEP 5.2: Duplicate by cosine (score={cos_sim:.4f} "
                        f"≥ {COSINE_THRESHOLD}) with article_id={nb.get('article_id')}"
                    )
                    is_duplicate_semantic = True
                    break

            if is_duplicate_semantic:
                return item

            spider.logger.info("STEP 5.2: Passed Semantic Dedup check.")

        # 6. Summarize
        spider.logger.info(
            "⏳ STEP 6: Calling Spring AI service for summarization..."
        )
        self._summarize_text_ai(adapter, spider)
        if adapter.get("summary") and "Lỗi" not in adapter.get("summary", ""):
            spider.logger.info("STEP 6: Summarization complete.")
        else:
            spider.logger.warning(
                f"STEP 6: Summarization failed or empty. Summary: {adapter.get('summary')}"
            )
            adapter["summary"] = (
                final_content[:400] + "..."
                if len(final_content) > 400
                else final_content
            )

        # 7. Create article + store embedding
        spider.logger.info("STEP 7: Creating Article in CMS (Strapi)...")
        article_id = self._create_article_with_hash(adapter, category_id, c_hash)

        if article_id and embedding_vector:
            if len(embedding_vector) == 768:
                self.es_client.store_embedding(
                    article_id=article_id,
                    embedding=embedding_vector,
                    content_url=adapter.get("external_url"),
                    logger=spider.logger,
                )
            else:
                spider.logger.warning(
                    f"Embedding dim != 768: {len(embedding_vector)}. Skipped ES index."
                )
        elif not article_id:
            spider.logger.error(
                "STEP 7: Failed to create article in CMS. Skipping ES indexing."
            )
        else:
            spider.logger.info(
                "STEP 7: Article created successfully but no embedding vector to index."
            )

        spider.logger.info(
            f"--- FINISHED Processing Article: {adapter.get('title')} ---"
        )
        return item

    # -------------- HELPERS --------------

    def _summarize_text_ai(self, adapter, spider):
        self._article_pipeline._summarize_text_ai(adapter, spider)

    def _convert_html_to_markdown(self, adapter):
        content = adapter.get("content", "")
        h = html2text.HTML2Text()
        h.ignore_links = False
        h.body_width = 0
        markdown_content = h.handle(content)
        adapter["content"] = markdown_content

    def extract_image_urls(self, adapter):
        content = adapter.get("content", "")
        soup = BeautifulSoup(content, "html.parser")
        img_tags = soup.find_all("img")
        if img_tags:
            return [img.get("src") for img in img_tags if img.get("src")]
        return None

    def extract_file_urls(self, adapter, extensions=None):
        content = adapter.get("content", "")
        soup = BeautifulSoup(content, "html.parser")
        if extensions is None:
            extensions = [
                ".pdf",
                ".docx",
                ".xlsx",
                ".doc",
                ".xls",
                ".zip",
                ".ppt",
                ".mp4",
            ]
        patt = re.compile(
            r"(" + "|".join(map(re.escape, extensions)) + r")(\?|$)",
            re.IGNORECASE,
        )
        file_urls = [
            a["href"]
            for a in soup.find_all("a", href=True)
            if patt.search(a["href"])
        ]
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
                    timeout=DEFAULT_TIMEOUT,
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

    def download_file(
        self,
        file_url,
        base_url,
        save_dir="downloads",
        user_agent=DEFAULT_USER_AGENT,
        referer=None,
    ):
        full_url = urljoin(base_url, file_url)
        headers = {"User-Agent": user_agent, "Referer": referer or base_url}
        response = requests.get(
            full_url,
            headers=headers,
            allow_redirects=True,
            timeout=DEFAULT_TIMEOUT,
        )
        ctype = response.headers.get("Content-Type", "").lower()
        if response.ok and "text/html" not in ctype:
            os.makedirs(save_dir, exist_ok=True)
            file_name = unquote(full_url.split("/")[-1]).split("?")[0]
            file_path = os.path.join(save_dir, file_name)
            with open(file_path, "wb") as f:
                f.write(response.content)
            print("File saved to:", file_path)
            return file_path
        else:
            raise Exception(
                f"Failed to download file from {full_url} "
                f"(ctype={ctype}, status={response.status_code})"
            )

    def replace_all_variants(self, adapter, old_url, new_url):
        content = adapter.get("content", "")
        department_source_url = adapter.get("department_source_url", "")

        variants = [
            old_url,
            unquote(old_url),
            urljoin(department_source_url, old_url),
            urljoin(department_source_url, unquote(old_url)),
            old_url.split("?")[0],
            unquote(old_url).split("?")[0],
        ]
        for variant in variants:
            if variant and (variant in content):
                content = content.replace(variant, new_url)
        adapter["content"] = content

    def _create_article_with_hash(
        self, adapter, category_id, c_hash: str
    ) -> str | None:
        response = requests.post(
            self._graphql_url_endpoint,
            headers={"Authorization": f"Bearer {self._token}"},
            timeout=DEFAULT_TIMEOUT,
            json={
                "query": CREATE_ARTICLE,
                "variables": {
                    "title": adapter.get("title"),
                    "content": adapter.get("content"),
                    "summary": adapter.get("summary"),
                    "thumbnail": adapter.get("thumbnail"),
                    "external_slug": adapter.get("external_slug"),
                    "external_url": adapter.get("external_url"),
                    "external_publish_date": adapter.get("external_publish_date"),
                    "categoryId": category_id,
                    "content_hash": c_hash,
                },
            },
        )
        try:
            if response.status_code == 200:
                data = response.json()
                if "errors" in data:
                    print("GraphQL errors:", data["errors"])
                    return None
                article_id = (
                    data.get("data", {})
                    .get("createArticle", {})
                    .get("documentId")
                )
                print(f"Article created successfully with ID: {article_id}")
                return article_id
            else:
                print(
                    f"Request thất bại: {response.status_code} {response.text}"
                )
                return None
        except Exception as e:
            print("Exception occurred while creating article:", e)
            return None

    def _is_article_exist(self, external_url):
        try:
            response = requests.post(
                self._graphql_url_endpoint,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {self._token}",
                },
                json={
                    "query": IS_ARTICLE_EXIT,
                    "variables": {"external_url": external_url},
                },
                timeout=DEFAULT_TIMEOUT,
            )
            response.raise_for_status()
            data = response.json()
            return len(data.get("data", {}).get("articles", [])) > 0
        except requests.exceptions.RequestException as e:
            print(f"exist_by_external_url failed: {e}")
            return False

    def _is_article_exist_by_hash(self, c_hash: str) -> bool:
        try:
            r = requests.post(
                self._graphql_url_endpoint,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {self._token}",
                },
                json={
                    "query": IS_ARTICLE_EXIST_BY_HASH,
                    "variables": {"content_hash": c_hash},
                },
                timeout=DEFAULT_TIMEOUT,
            )
            r.raise_for_status()
            data = r.json()
            items = (
                data.get("data", {})
                .get("articles", {})
                .get("data", [])
                or []
            )
            return len(items) > 0
        except requests.exceptions.RequestException as e:
            print(f"Hash dedup check failed: {e}")
            return False
