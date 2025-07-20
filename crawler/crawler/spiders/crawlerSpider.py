import scrapy
import json
from urllib.parse import urljoin
from datetime import datetime
from crawler.items import ArticleItem
from scrapy.exceptions import CloseSpider
import requests
from crawler.config import UNIFEED_CMS_GRAPHQL_HOST, UNIFEED_CMS_GRAPHQL_PORT, UNIFEED_CMS_GRAPHQL_ENDPOINT, UNIFEED_CMS_GRAPHQL_TOKEN


class DynamicIUHSpider(scrapy.Spider):
    name = "iuh"

    def __init__(self, *args, **kwargs):
        self._graphql_url_endpoint = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/{UNIFEED_CMS_GRAPHQL_ENDPOINT}'
        self._token = UNIFEED_CMS_GRAPHQL_TOKEN
    
        self.key_max_pages = int(kwargs.pop('key_max_pages', 0)) or None
        self.key_department = kwargs.pop('key_department', None)
        self.key_category = kwargs.pop('key_category', None)

        self.page_counter = {}
        self.latest_dates = {}

        super().__init__(*args, **kwargs)
        
    def get_configs_from_strapi(self):
        query = """
            query {
                crawlerConfigs {
                    url
                    department {
                        key_department
                        department_url
                        department_name
                        categories {
                            key_category
                            category_url
                            category_name
                            last_external_publish_date
                        },
                    },
                    relative_url_list
                    relative_url
                    thumbnail
                    next_pages
                    title
                    content
                    external_publish_date
                }
            }
        """
        res = requests.post(
            self._graphql_url_endpoint,
            json={"query": query},
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self._token}"
            }
        )  
        return res.json()["data"]["crawlerConfigs"]

    def start_requests(self):
        self.configs = self.get_configs_from_strapi()

        for config in self.configs:
            dept = config.get('department', {})
            key_dept = dept.get('key_department')

            if self.key_department and key_dept != self.key_department:
                continue

            for start in config.get('department', {}).get('categories', []):
                if self.key_category and start.get('key_category') != self.key_category:
                    continue

                try:
                    start['last_external_publish_date'] = datetime.strptime(
                        start.get('last_external_publish_date', '2025-05-01'), "%Y-%m-%d"
                    ).date()
                except Exception:
                    start['last_external_publish_date'] = datetime.strptime("2025-05-01", "%Y-%m-%d").date()

                category_url = start['category_url']
                self.page_counter[category_url] = 1

                yield scrapy.Request(
                    url=category_url,
                    callback=self.parse_list,
                    meta={
                        'config': config,
                        'start': start,
                        'category_name': start['category_name'],
                        'department_name': dept.get('department_name', key_dept),
                        'department_url': dept.get('department_url', key_dept),
                        'key_department': key_dept,
                        'key_category': start.get('key_category'),
                        'category_url': category_url,
                        'last_external_publish_date': start['last_external_publish_date']
                    }
                )
    def update_category_last_date(self, key_department, key_category, last_date):
        query_find = """
        query ($key: String!, $dept_key: String!) {
            categories(filters: {
                key_category: { eq: $key },
                department: { key_department: { eq: $dept_key } }
            }) {
                documentId
                last_external_publish_date
            }
        }
        """
        res = requests.post(
            self._graphql_url_endpoint,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self._token}'
            },
            json={
                'query': query_find,
                'variables': {
                    'key': key_category,
                    'dept_key': key_department
                }
            }
        )
        res_json = res.json()
        data = res_json.get("data", {}).get("categories", [])
        if not data:
            print(f"❌ Không tìm thấy category: {key_department} / {key_category}")
            return
        category = data[0]
        category_id = category['documentId']
        current_last_date_str = category.get('last_external_publish_date')

        # So sánh ngày
        if current_last_date_str:
            try:
                current_last_date = datetime.strptime(current_last_date_str, '%Y-%m-%d').date()
                if current_last_date >= last_date:
                    print(f"⚠️ Không cần cập nhật vì ngày hiện tại ({current_last_date}) >= {last_date}")
                    return
            except Exception as e:
                print(f"❌ Lỗi phân tích ngày hiện tại: {e}")
        
        # Tiến hành cập nhật nếu khác
        mutation = """
        mutation updateCategory($id: ID!, $lastDate: Date!) {
            updateCategory(documentId: $id, data: {
                last_external_publish_date: $lastDate
            }) {
                key_category,
                last_external_publish_date,
                documentId
            }
        }
        """
        res = requests.post(
            self._graphql_url_endpoint,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self._token}'
            },
            json={
                'query': mutation,
                'variables': {
                    'id': category_id,
                    'lastDate': last_date.strftime('%Y-%m-%d')
                }
            }
        )
        print(f"✅ Cập nhật {key_department}/{key_category} → {last_date.strftime('%Y-%m-%d')}")

    def parse_list(self, response):
        config = response.meta['config']
        category_name = response.meta['category_name']
        category_url = response.meta['category_url']
        key_dept = response.meta['key_department']
        key_cat = response.meta['key_category']
        last_date = response.meta['last_external_publish_date']

        config_key = f"{key_dept}_{key_cat}"
        current_page = self.page_counter.get(category_url, 1)
        self.page_counter[category_url] = current_page + 1

        articles = response.css(config['relative_url_list'])
        should_continue = True
        requests = []

        for article in articles:
            relative_url = article.css(config['relative_url']).get()
            thumbnail = article.css(config['thumbnail']).get()
            date_str = article.css(config['external_publish_date']).get()

            if not date_str:
                self.logger.warning("❌ Không tìm thấy ngày đăng bài viết")
                continue

            try:
                article_date = datetime.strptime(date_str.strip(), "%d-%m-%Y").date()
            except Exception as e:
                self.logger.warning(f"❌ Lỗi parse ngày: {date_str} | {e}")
                continue

            self.logger.info(f"📅 {relative_url} => {article_date} vs {last_date}")

            if article_date >= last_date:
                # Lưu bài mới
                if config_key not in self.latest_dates or article_date > self.latest_dates[config_key]:
                    self.latest_dates[config_key] = article_date

                if relative_url:
                    full_url = urljoin(response.url, relative_url)
                    req = scrapy.Request(
                        url=full_url,
                        callback=self.parse_detail,
                        meta={
                            'config': config,
                            'category_name': category_name,
                            'category_url': category_url,
                            'thumbnail': thumbnail,
                            'department_name': response.meta.get('department_name'),
                            'department_url': response.meta.get('department_url'),
                            'external_publish_date': article_date.strftime("%Y-%m-%d")
                        }
                    )
                    requests.append(req)

            else:
                self.logger.info("🛑 Tất cả bài trên trang hiện tại đều đã cũ → dừng crawler.")
                should_continue = False
                
                # 🔁 Cập nhật last_date lên Strapi nếu có bài mới hơn
                if config_key in self.latest_dates:
                    new_date = self.latest_dates[config_key]
                    self.update_category_last_date(
                        key_department=key_dept,
                        key_category=key_cat,
                        last_date=new_date
                    )
                
                break

        for req in requests:
            yield req

        # Nếu chưa gặp bài trùng hoặc cũ, tiếp tục sang trang tiếp theo
        if should_continue:
            next_pages = response.css(config['next_pages']).getall()
            if next_pages:
                next_page_url = urljoin(response.url, next_pages[-1])
                yield scrapy.Request(
                    url=next_page_url,
                    callback=self.parse_list,
                    meta=response.meta
                )

    def parse_detail(self, response):
        config = response.meta['config']

        item = ArticleItem()
        item['external_url'] = response.url
        item['external_slug'] = response.url.split('/')[-1]
        item['thumbnail'] = response.meta.get('thumbnail')
        item['department_name'] = response.meta.get('department_name')
        item['department_url'] = response.meta.get('department_url')
        item['category_name'] = response.meta['category_name']
        item['category_url'] = response.meta['category_url']
        item['title'] = response.css(config['title']).get()
        item['content'] = response.css(config['content']).get()
        item['external_publish_date'] = response.meta.get('external_publish_date')

        yield item

