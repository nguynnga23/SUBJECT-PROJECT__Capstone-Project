import json
import requests
from datetime import datetime
from itemadapter import ItemAdapter
from bs4 import BeautifulSoup
import re
import html2text
import os
from urllib.parse import unquote
from urllib.parse import urljoin
from w3lib.html import remove_tags
import mimetypes

from crawler.items import ArticleItem
from crawler.config import UNIFEED_CMS_GRAPHQL_HOST, UNIFEED_CMS_GRAPHQL_PORT, UNIFEED_CMS_GRAPHQL_ENDPOINT, UNIFEED_CMS_GRAPHQL_TOKEN

class ArticlePipeline:
    # def __init__(self):
    #      # Tạo pipeline AI ngay khi pipeline khởi tạo   
    #     self.summarizer = pipeline(
    #         "summarization",
    #         model="VietAI/vit5-large-vietnews-summarization",
    #         tokenizer="VietAI/vit5-large-vietnews-summarization"
    #     )  
    def _clean_title(self, adapter):
        title = adapter.get('title', '')
        cleaned_title = title.replace('\r\n', ' ').strip()
        adapter['title'] = cleaned_title
    

    def clean_markdown(self, text: str) -> str:
        """Chuyển markdown về plain text."""
        text = re.sub(r'!\[.*?\]\(.*?\)', '', text)                       # Remove images
        text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)                   # Remove links
        text = re.sub(r'[_*]{1,2}(.*?)[_*]{1,2}', r'\1', text)            # Remove bold/italic
        text = re.sub(r'^#+\s+', '', text, flags=re.MULTILINE)           # Remove headings
        text = re.sub(r'\n+', '\n', text)                                 # Normalize newlines
        return text.strip()
        
    def _summarize_text(self, adapter, spider):
        

        # content_html = adapter.get('content', '')

        # # Bước 1: HTML to plain text
        # plain_text = remove_tags(content_html)

        # # Bước 2: Làm sạch markdown
        # plain_text = self.clean_markdown(plain_text)

        # # Bước 3: Giới hạn độ dài (ví dụ: 500 từ)
        # words = plain_text.split()
        # if len(words) > 200:  
        #     plain_text = " ".join(words[:200])

        # # Bước 4: Gọi summarizer nếu đủ dài
        # if len(words) > 50:
        #     try:
        #         result = self.summarizer(
        #             plain_text,
        #             max_length=130,
        #             min_length=30,
        #         )
        #         if isinstance(result, list) and len(result) > 0 and "summary_text" in result[0]:
        #             adapter["summary"] = result[0]["summary_text"]
        #         else:
        #             adapter["summary"] = ""  # fallback rút gọn thủ công
        #     except Exception as e:
        #         spider.logger.warning(f"AI summarization failed: {e}")
        #         adapter["summary"] = ""
        # else:
            adapter["summary"] = "" 

    
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        self._clean_title(adapter)
        self._summarize_text(adapter, spider)

        return item 

class DuplicateArticlePipeline:
    def __init__(self):
        pass

class CMSPipeline:

    def __init__(self) -> None:
        self._graphql_url_endpoint = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/{UNIFEED_CMS_GRAPHQL_ENDPOINT}'
        self._token = UNIFEED_CMS_GRAPHQL_TOKEN
        pass

    def process_item(self, item, spider) -> ArticleItem:
        adapter = ItemAdapter(item)
        
        # Áp dụng Duplicate Filtering kiểm tra trùng external_url
        if self._is_article_exist(adapter.get('external_url')):
            spider.logger.info(f"Duplicate article skipped: {adapter.get('external_url')}")
            return  # bỏ qua nếu trùng
        
        department_url = adapter.get('department_url')
        department_id = self._get_department(department_url)
        if not department_id:
            spider.logger.warning(f"❌ Không tìm thấy department với key: {department_url}")
            return  # Bỏ qua nếu không có department
        
        category_url = adapter.get('category_url')
        category_name = adapter.get('category_name')
        category_id = self._get_category(category_url, department_id)
        if not category_id:
            spider.logger.warning(f"❌ Không tìm thấy category với key: {category_name} và department: {department_url}")
            return  # Bỏ qua nếu không có category phù hợp
    
        # Upload file/image to Strapi
        department_url = adapter.get('department_url', '')
        base_url = f'https://{department_url}'
        strapi_url = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}'

        # 1. Upload các file tài liệu, video, v.v.
        extensions = ['.pdf', '.docx', '.xlsx', '.doc', '.xls', '.zip', '.ppt', '.mp4']
        file_urls = self.extract_file_urls(adapter, extensions)
        if file_urls:
            for file_url in file_urls:
                file_path = self.download_file(file_url, base_url)
                new_url = self.upload_file_to_strapi(file_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN)
                if new_url:
                    self.replace_all_variants(adapter, file_url, new_url)

        # 2. Upload hình ảnh
        img_urls = self.extract_image_urls(adapter)
        if img_urls:
            for img_url in img_urls:
                img_path = self.download_file(img_url, base_url)
                new_img_url = self.upload_file_to_strapi(img_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN)
                if new_img_url and isinstance(adapter['content'], str):
                    self.replace_all_variants(adapter, img_url, new_img_url)
            
                name_img_url = unquote(img_url.split('/')[-1])
                thumbnail = adapter.get('thumbnail', '').split('/')[-1]
                if thumbnail == name_img_url and new_img_url:
                    adapter['thumbnail'] = new_img_url
                elif thumbnail == "img_default.png":
                    adapter['thumbnail'] = "https://iuh.edu.vn/templates/2015/image/img_default.png"
        else:
            base_url = f"https://{adapter['department_url']}/"
            adapter['thumbnail'] = urljoin(base_url, adapter['thumbnail'])

        # 3. Convert HTML → Markdown
        self._convert_html_to_markdown(adapter)
        self._create_article(adapter, category_id)
        return item
    
    def _convert_html_to_markdown(self, adapter):
        content = adapter.get('content', '')
        h = html2text.HTML2Text()
        h.ignore_links = False  # Keep links in the Markdown output
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
    
        file_urls = [
            a['href'] for a in soup.find_all('a', href=True)
            if any(a['href'].lower().endswith(ext) for ext in extensions)
        ]
        return file_urls if file_urls else None
    
    def upload_file_to_strapi(self, file_path, strapi_url, token):
        with open(file_path, "rb") as file:
            file_name = os.path.basename(file_path)
            mime_type, _ = mimetypes.guess_type(file_path)
            mime_type = mime_type or "application/octet-stream"

            res = requests.post(
                f"{strapi_url}/api/upload",
                files={"files": (file_name, file, mime_type)},
                headers={"Authorization": f"Bearer {token}"},
            )
            if res:
                response_data = res.json()
                if isinstance(response_data, list) and response_data:
                   file_url = response_data[0].get("url")
                   return f"{strapi_url}{file_url}" if file_url else None
        return None
            
    def download_file(self, file_url, base_url, save_dir='downloads'):
        full_url = urljoin(base_url, file_url)
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            ),
            "Referer": base_url,
        }

        response = requests.get(full_url, headers=headers, allow_redirects=True)
      
        # Check if the content is not an HTML error page
        if response.ok and "html" not in response.headers.get("Content-Type", ""):
            os.makedirs(save_dir, exist_ok=True)
            file_name = unquote(full_url.split('/')[-1])
            file_path = os.path.join(save_dir, file_name)
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print("✅ File saved to:", file_path)
            return file_path
        else:
            raise Exception(f"❌ Failed to download file from {full_url}")
    
    def replace_all_variants(self, adapter, old_url, new_url):
        """
        Thay thế tất cả biến thể của old_url trong content: 
        - dạng encode (%20)
        - dạng decode (khoảng trắng)
        - có domain (https://...)
        """
        content = adapter.get('content', '')
        department_url = adapter.get('department_url', '')
        base_url = f'https://{department_url}'

        # Các dạng URL có thể tồn tại trong content
        variants = [
            old_url,
            unquote(old_url),
            urljoin(base_url, old_url),
            urljoin(base_url, unquote(old_url))
        ]

        for variant in variants:
           if variant in content:
                content = content.replace(variant, new_url)

        adapter['content'] = content
    
    
    
    def _get_department(self, department_url):
        query = """
            query checkDepartment($url: String!) {
                departments(filters: { department_url: {eq: $url} }) {
                    documentId
                }
            }
        """
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
            data=json.dumps({'query': query, 'variables': {'url': department_url}})
        )        
        try:
            data = response.json()
            departments = data.get('data', {}).get('departments', [])
            if departments:
                return departments[0].get('documentId')
        except Exception as e:
            print("❌ Lỗi khi lấy department:", e)
            print("Response text:", response.text)
        return None
        
    def _get_category(self, category_url, department_id):
        query = """
           query checkCategory($url: String!, $department_id: ID!) {
            categories(
                 filters: {
                    category_url: { eq: $url }
                    department: {
                        documentId: { eq: $department_id }
                    }
                }
            ) {
                documentId
            }
        }
        """
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
            data=json.dumps({'query': query, 'variables': {'url': category_url, 'department_id': department_id}})
        )
        try:
            data = response.json()
            categories = data.get('data', {}).get('categories', [])
            if categories:
                return categories[0].get('documentId')
        except Exception as e:
            print("❌ Lỗi khi lấy category:", e)
            print("Response text:", response.text)
        return None


    def _create_article(self, adapter, category_id):
        query = """
        mutation createArticle(
          $title: String!,
          $content: String!,
          $summary: String!,
          $thumbnail: String!,
          $external_slug: String!,
          $external_url: String!,
          $external_publish_date: Date!,
          $categoryId: ID!
        ) {
          createArticle(
            data: {
              title: $title,
              content: $content,
              summary: $summary,
              thumbnail: $thumbnail,
              external_slug: $external_slug,
              external_url: $external_url,
              external_publish_date: $external_publish_date,
              category: $categoryId
            }
          ) {
            title
            summary
            thumbnail
            external_slug
            external_url
            external_publish_date
            category {
              documentId
            }
          }
        }
        """
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
            timeout=10,
            data=json.dumps({'query': query, 'variables': {
                'title': adapter.get('title'),
                'content': adapter.get('content'),
                'summary': adapter.get('summary'),
                'thumbnail': adapter.get('thumbnail'),
                'external_slug': adapter.get('external_slug'),
                'external_url': adapter.get('external_url'),
                'external_publish_date': adapter.get('external_publish_date'),
                'categoryId': category_id,
            }})
        )
        try:
            if response.status_code == 200:
                data = response.json()
                # Kiểm tra xem có lỗi GraphQL không (thường nằm trong trường 'errors')
                if 'errors' in data:
                    print("❌ GraphQL errors:", data['errors'])
                else:
                    print("✅ Article created successfully")
            else:
                print("❌ Failed to create article")
                print("Status code:", response.status_code)
                print("Response:", response.text)
        except Exception as e:
            print("❌ Exception occurred while creating article:", e)
    
    # Áp dụng Duplicate Filtering          
    def _is_article_exist(self, external_url):
        query = """
        query checkArticle($external_url: String!) {
            articles(filters: { external_url: { eq: $external_url } }) {
                title
            }
        }
        """
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
            data=json.dumps({'query': query, 'variables': {'external_url': external_url}})
        )
        data = response.json()
        return len(data['data']['articles']) > 0