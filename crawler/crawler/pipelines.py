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
from crawler.graphql_queries.article_service import CREATE_ARTICLE, IS_ARTICLE_EXIT

SPRING_BOOT_URL = "http://localhost:8080/v1/summary/article" 

DEFAULT_USER_AGENT = (
    "Mozilla/50 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

class ArticlePipeline:
    
    def _clean_title(self, adapter):
        title = adapter.get('title', '')
        cleaned_title = title.replace('\r\n', ' ').strip()
        adapter['title'] = cleaned_title
    
    def _summarize_text_ai(self, adapter, spider):
        """Gọi API Spring Boot để tóm tắt nội dung (text/pdf) bằng Gemini."""
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
                spider.logger.info(f"✅ Tóm tắt AI thành công cho: {adapter.get('title')}")
            else:
                adapter["summary"] = f"Lỗi HTTP {response.status_code} từ Spring AI."
                spider.logger.warning(f"❌ Lỗi tóm tắt AI: {response.status_code}. Chi tiết: {response.text}")
                
        except requests.exceptions.RequestException as e:
            adapter["summary"] = f"Lỗi kết nối dịch vụ Spring Boot: {e}"
            spider.logger.error(f"❌ Lỗi kết nối API tóm tắt: {e}")

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        self._clean_title(adapter)
        self._summarize_text_ai(adapter, spider)
        return item 


class CMSPipeline:

    def __init__(self) -> None:
        self._graphql_url_endpoint = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/{UNIFEED_CMS_GRAPHQL_ENDPOINT}'
        self._token = UNIFEED_CMS_GRAPHQL_TOKEN
        self._article_pipeline = ArticlePipeline()
        pass

    def process_item(self, item, spider) -> ArticleItem:
        adapter = ItemAdapter(item)
        
        # Áp dụng Duplicate Filtering kiểm tra trùng external_url
        if self._is_article_exist(adapter.get('external_url')):
            spider.logger.info(f"Duplicate article skipped: {adapter.get('external_url')}")
            return item # Hoặc return None nếu bạn muốn bỏ qua item
        
        department_source_id = adapter.get('department_source_id')
        department_source_name = adapter.get('department_source_name')
        if not department_source_id:
            spider.logger.warning(f"❌ Không tìm thấy department với key: {department_source_name}")
            return item # Hoặc return None
        
        category_name = adapter.get('category_name')
        category_id = adapter.get('category_id')
        if not category_id:
            spider.logger.warning(f"❌ Không tìm thấy category với key: {category_name} và department: {department_source_name}")
            return item # Hoặc return None
        
        # Upload file/image to Strapi
        department_source_url = adapter.get('department_source_url', '')
        strapi_url = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}'

        # 1. Upload các file tài liệu, video, v.v. (Quan trọng: Cập nhật content)
        extensions = ['.pdf', '.docx', '.xlsx', '.doc', '.xls', '.zip', '.ppt', '.mp4']
        file_urls = self.extract_file_urls(adapter, extensions)
        if file_urls:
            for file_url in file_urls:
                file_path = self.download_file(file_url, department_source_url)
                new_url = self.upload_file_to_strapi(file_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN)
                if new_url:
                    self.replace_all_variants(adapter, file_url, new_url) # Thay URL gốc bằng URL Strapi công khai

        # 2. Upload hình ảnh
        img_urls = self.extract_image_urls(adapter)
        if img_urls:
            for img_url in img_urls:
                img_path = self.download_file(img_url, department_source_url)
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
            adapter['thumbnail'] = urljoin(adapter['department_source_url'], adapter['thumbnail'])


        # 3. Convert HTML → Markdown
        self._convert_html_to_markdown(adapter)
    
        
        # 5. Tạo Article trên Strapi
        self._create_article(adapter, category_id)
        
        return item

    def _convert_html_to_markdown(self, adapter):
        content = adapter.get('content', '')
        h = html2text.HTML2Text()
        h.ignore_links = False 
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
            
    def download_file(self, file_url, base_url, save_dir='downloads', user_agent=DEFAULT_USER_AGENT, referer=None):
        full_url = urljoin(base_url, file_url)
        headers = {
            "User-Agent": user_agent,
            "Referer": referer or base_url,
        }

        response = requests.get(full_url, headers=headers, allow_redirects=True)
      
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
        content = adapter.get('content', '')
        department_source_url = adapter.get('department_source_url', '')

        variants = [
            old_url,
            unquote(old_url),
            urljoin(department_source_url, old_url),
            urljoin(department_source_url, unquote(old_url))
        ]

        for variant in variants:
           if variant in content:
                content = content.replace(variant, new_url)

        adapter['content'] = content
    
    def _create_article(self, adapter, category_id):
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Authorization': f'Bearer {self._token}'},
            timeout=10,
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
                }
            }
        )
        try:
            if response.status_code == 200:
                data = response.json()
                if 'errors' in data:
                    print("❌ GraphQL errors:", data['errors'])
                else:
                    print("✅ Article created successfully")
            else:
                print(f"❌ Request thất bại: {response.status_code} {response.text}")
        except Exception as e:
            print("❌ Exception occurred while creating article:", e)
    
    def _is_article_exist(self, external_url):
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
            data=json.dumps({'query': IS_ARTICLE_EXIT, 'variables': {'external_url': external_url}})
        )
        data = response.json()
        return len(data['data']['articles']) > 0