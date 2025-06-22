import json
import requests
from datetime import datetime
from itemadapter import ItemAdapter
from bs4 import BeautifulSoup
import html2text
import os

from crawler.items import ArticleItem
from crawler.config import UNIFEED_CMS_GRAPHQL_HOST, UNIFEED_CMS_GRAPHQL_PORT, UNIFEED_CMS_GRAPHQL_ENDPOINT, UNIFEED_CMS_GRAPHQL_TOKEN

class ArticlePipeline:
    def _clean_title(self, adapter):
        title = adapter.get('title', '')
        cleaned_title = title.replace('\r\n', ' ').strip()
        adapter['title'] = cleaned_title

    def _format_time(self, adapter):
        time = adapter.get('external_publish_date')
        if time:
            try:
                # Convert time from DD/MM/YYYY to YYYY-MM-DD
                formatted_time = datetime.strptime(time, "%d-%m-%Y").strftime("%Y-%m-%d")
                adapter['external_publish_date'] = formatted_time
            except ValueError:
                print(f"Invalid date format: {time}")
        else:
            print("No time provided")    
    
    def _convert_html_to_markdown(self, adapter):
        content = adapter.get('content', '')
        h = html2text.HTML2Text()
        h.ignore_links = False  # Keep links in the Markdown output
        markdown_content = h.handle(content)
        adapter['content'] = markdown_content


    def _clean_summary(self, adapter):
        summary = adapter.get('summary', '')
        soup = BeautifulSoup(summary, 'html.parser')
        adapter['summary'] = soup.get_text()


    def extract_pdf_url(self, adapter):
        content = adapter.get('content', '')        
        soup = BeautifulSoup(content, 'html.parser')
        pdf_urls = [a.get('href') for a in soup.find_all('a', href=True) if a['href'].lower().endswith('.pdf')]
        return pdf_urls if pdf_urls else None
    
    def extract_image_urls(self, adapter):
        content = adapter.get('content', '')        
        soup = BeautifulSoup(content, 'html.parser')
        img_tags = soup.find_all('img')
        if img_tags:
            img_urls = [img.get('src') for img in img_tags if img.get('src')]
            return img_urls
        return None
    
    def upload_file_to_strapi(self, file_path, strapi_url, token, file_type):
        with open(file_path, "rb") as file: 
            file_extension = os.path.splitext(file_path)[1].lower()
            mime_type = "application/pdf" if file_type == "pdf" else f"image/{file_extension[1:]}"
            
            res = requests.post(
                f"{strapi_url}/api/upload",
                files={"files":  (os.path.basename(file_path), file, mime_type)}, 
                headers={
                    "Authorization": f"Bearer {token}",
                },
            )
            if res:
                response_data = res.json()
                if isinstance(response_data, list) and response_data:
                    file_url = response_data[0].get("url")
                    return f"{strapi_url}{file_url}" if file_url else None
        return None
            
    def download_file(self, file_url, base_url, save_dir='downloads'):
        file_url = base_url + file_url
        os.makedirs(save_dir, exist_ok=True)

        file_name = file_url.split('/')[-1]
        file_path = os.path.join(save_dir, file_name)

        response = requests.get(file_url)
        if response:
            with open(file_path, 'wb') as file:
                file.write(response.content)
            return file_path
        else:
            raise Exception(f"Failed to download file from {file_url}")

    
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        # Clean title (remove unnecessary whitespace and newlines)
        self._clean_title(adapter)
        # Format time (DD/MM/YYYY to YYYY-MM-DD)
        self._format_time(adapter)
        # Clean summary
        self._clean_summary(adapter)
        
        # Process <a> or <img> to upload PDF or IMAGE to Strapi
        department = adapter.get('department', '')
        base_url = f'https://{department}'
        strapi_url = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}'

        pdf_urls = self.extract_pdf_url(adapter)
        if pdf_urls:
            for pdf_url in pdf_urls:
                pdf_path = self.download_file(pdf_url, base_url)
                new_pdf_url = self.upload_file_to_strapi(pdf_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN, "pdf")
                if new_pdf_url:
                    adapter['content'] = adapter['content'].replace(pdf_url, new_pdf_url)
        img_urls = self.extract_image_urls(adapter)
        if img_urls:
            for img_url in img_urls:
                img_path = self.download_file(img_url, base_url)
                new_img_url = self.upload_file_to_strapi(img_path, strapi_url, UNIFEED_CMS_GRAPHQL_TOKEN, "image")
                if new_img_url:
                    adapter['content'] = adapter['content'].replace(img_url, new_img_url)
        # Convert HTML content to Markdown
        self._convert_html_to_markdown(adapter)

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
        
        department_name = adapter.get('department')
        department_id = self._get_or_create_department(department_name)
        
        category_name = adapter.get('category')
        category_id = self._get_or_create_category(category_name, department_id)
# 
        self._create_article(adapter, category_id)

        return item
    def _get_or_create_department(self, department_name):
        query = """
            query checkDepartment($name: String!) {
                departments(filters: { name: {eq: $name} }) {
                    documentId
                }
            }
        """
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
            data=json.dumps({'query': query, 'variables': {'name': department_name}})
        )        
        data = response.json()
        
        if data['data']['departments'] != []:
            return data['data']['departments'][0]['documentId']
        else:
            create_query = """
                mutation createDepartment($name: String!) {
                  createDepartment(data: {
                    name: $name
                  }) {
                    name
                    documentId
                  }
                }  
            """
            response = requests.post(
                self._graphql_url_endpoint,
                headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
                data=json.dumps({'query': create_query, 'variables': {'name': department_name}})
            )
            data = response.json()
            return data['data']['createDepartment']['documentId']

    def _get_or_create_category(self, category_name, department_id):
        query = """
            query checkCategory($name: String!) {
                categories(filters: { name: {eq: $name} }) {
                    documentId
                }
            }
        """
        response = requests.post(
            self._graphql_url_endpoint,
            headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
            data=json.dumps({'query': query, 'variables': {'name': category_name}})
        )
        # 
        data = response.json()
        if data['data']['categories'] != []:
            return data['data']['categories'][0]['documentId']
        else:
            create_query = """
            mutation createCategory($name: String!, $departmentId: ID!) {
              createCategory(data: {
                name: $name
                department: $departmentId
              }) {
                name
                documentId
                department {
                  documentId
                }
              }
            }
            """
            response = requests.post(
                self._graphql_url_endpoint,
                headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {self._token}'},
                data=json.dumps({'query': create_query, 'variables': {'name': category_name, 'departmentId': department_id}})
            )
            data = response.json()
            return data['data']['createCategory']['documentId']


    def _create_article(self, adapter, category_id):
        query = """
        mutation createArticle(
          $title: String!,
          $content: String!,
          $summary: String!,
          $thumbnail: String!,
          $external_slug: String!,
          $external_url: String!,
          $external_id: String!,
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
              external_id: $external_id,
              external_publish_date: $external_publish_date,
              category: $categoryId
            }
          ) {
            title
            summary
            thumbnail
            external_slug
            external_url
            external_id
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
                'external_id': adapter.get('external_id'),
                'external_publish_date': adapter.get('external_publish_date'),
                'categoryId': category_id,
            }})
        )
        data = response.json()
        if response.status_code == 200:
            print("Article created successfully:")
        else:
            print("Error:", data)