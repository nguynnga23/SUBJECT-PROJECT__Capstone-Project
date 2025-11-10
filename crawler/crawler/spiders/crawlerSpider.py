import scrapy
import json
from urllib.parse import urljoin
from datetime import datetime
from crawler.items import ArticleItem
from scrapy.exceptions import CloseSpider
import requests
from crawler.config import UNIFEED_CMS_GRAPHQL_HOST, UNIFEED_CMS_GRAPHQL_PORT, UNIFEED_CMS_GRAPHQL_ENDPOINT, UNIFEED_CMS_GRAPHQL_TOKEN
from crawler.graphql_queries.crawler_config_service import GET_CRAWLER_CONFIG
from crawler.graphql_queries.category_service import UPDATE_LAST_DATE
from crawler.graphql_queries.article_service import CREATE_ARTICLE, IS_ARTICLE_EXIT
class DynamicIUHSpider(scrapy.Spider):
    name = "iuh"
    
    custom_settings = {
        "DEFAULT_REQUEST_HEADERS": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://fit.iuh.edu.vn/",
        }
    }

    def __init__(self, *args, **kwargs):
        self._graphql_url_endpoint = f'http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/{UNIFEED_CMS_GRAPHQL_ENDPOINT}'
        self._token = UNIFEED_CMS_GRAPHQL_TOKEN
    
        self.category_url = kwargs.pop('category_url', None)

        self.page_counter = {}
        self.latest_dates = {}

        super().__init__(*args, **kwargs)
        
    def get_configs_from_strapi(self): 
        variables = {
            "category_url": self.category_url
        }
        
        try:
            res = requests.post(
                self._graphql_url_endpoint,
                json={
                    "query": GET_CRAWLER_CONFIG,
                    "variables": variables
                },
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {self._token}"
                },
                timeout=10
            )
        except requests.RequestException as e:
            self.logger.error(f"Lỗi khi gọi Strapi API: {e}")
            return None

        if res.status_code != 200:
            self.logger.error(f"Strapi API trả về lỗi HTTP {res.status_code}: {res.text}")
            return None

        data = res.json().get("data")
        if not data or "crawlerConfigs" not in data or not data["crawlerConfigs"]:
            self.logger.warning("Không có response hoặc crawlerConfigs rỗng từ Strapi")
            return None

        return data["crawlerConfigs"]

    def start_requests(self):
        configs = self.get_configs_from_strapi()
        if not configs:
            raise CloseSpider("Không tìm thấy cấu hình crawler trong Strapi")
        self.config = configs[0]  
        self.dept = self.config.get('department_source', {})
        cats = self.dept.get("categories", [])
        
        self.cat = None
        for a in cats:
            if a["category_url"] == self.category_url:
                self.cat = a
        if self.cat:
            try:
                self.cat['last_external_publish_date'] = datetime.strptime(
                    self.cat.get('last_external_publish_date', '2025-09-20'), "%Y-%m-%d"
                ).date()
            except Exception:
                self.cat['last_external_publish_date'] = datetime.strptime("2025-05-01", "%Y-%m-%d").date()

            category_url = self.cat['category_url']
            self.page_counter[category_url] = 1
            
            yield scrapy.Request(
                url=category_url,
                callback=self.parse_list
            )

    def update_category_last_date(self, last_date):
        if self.cat:
            current_last_date_str = self.cat.get('last_external_publish_date')
            category_id = self.cat.get('documentId')
            # So sánh ngày
            if current_last_date_str:
                try:
                    if isinstance(current_last_date_str, str):
                        current_last_date = datetime.strptime(current_last_date_str, '%Y-%m-%d').date()
                    else:
                        current_last_date = current_last_date_str
                    if current_last_date >= last_date:
                        print(f"⚠️ Không cần cập nhật vì ngày hiện tại ({current_last_date}) >= {last_date}")
                        return
                except Exception as e:
                    print(f"❌ Lỗi phân tích ngày hiện tại: {e}")
        
        # Tiến hành cập nhật nếu khác
        res = requests.post(
            self._graphql_url_endpoint,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self._token}'
            },
            json={
                'query': UPDATE_LAST_DATE,
                'variables': {
                    'id': category_id,
                    'lastDate': last_date.strftime('%Y-%m-%d')
                }
            }
        )
        if res: 
            print(f"✅ Cập nhật {self.category_url} → {last_date.strftime('%Y-%m-%d')}")
            
    def parse_list(self, response):
        last_date = None
        if self.cat:
            last_date = self.cat.get('last_external_publish_date')
        config_key = f"{self.category_url}"
        current_page = self.page_counter.get(self.category_url, 1)
        self.page_counter[self.category_url] = current_page + 1

        articles = response.css(self.config['relative_url_list'])
        should_continue = True
        requests = []
        
        for article in articles:
            relative_url = article.css(self.config['relative_url']).get()
            thumbnail = article.css(self.config['thumbnail']).get()
            date_str = article.css(self.config['external_publish_date']).get()

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
                if relative_url:
                    full_url = urljoin(response.url, relative_url)
                
                    # Lưu bài mới
                    if config_key not in self.latest_dates or article_date > self.latest_dates[config_key]:
                        self.latest_dates[config_key] = article_date

                    req = scrapy.Request(
                        url=full_url,
                        callback=self.parse_detail,
                        meta={
                            'thumbnail': thumbnail,
                            'external_publish_date': article_date.strftime("%Y-%m-%d")
                        }
                    )
                    requests.append(req)
            else:
                self.logger.info("🛑 Tất cả bài trên trang hiện tại đều đã cũ → dừng pagination.")
                should_continue = False
                
                if config_key in self.latest_dates:
                    new_date = self.latest_dates[config_key]
                    self.update_category_last_date(
                        last_date=new_date
                    )
                break

        for req in requests:
            yield req

        # Nếu chưa gặp bài cũ, tiếp tục sang trang tiếp theo
        next_pages = response.css(self.config['next_pages']).getall()
        current_page = self.page_counter.get(self.category_url, 1)
        if should_continue and len(next_pages) >= current_page:
            next_page_url = urljoin(response.url, next_pages[current_page - 1])
            yield scrapy.Request(
                url=next_page_url,
                callback=self.parse_list,
                meta=response.meta
            )

    def parse_detail(self, response):
        item = ArticleItem()
        item['external_url'] = response.url
        item['external_slug'] = response.url.split('/')[-1]
        item['thumbnail'] = response.meta.get('thumbnail')
        item['department_source_id'] = self.dept.get('documentId')
        item['department_source_name'] = self.dept.get('label')
        item['department_source_url'] = self.dept.get('url')
        item['category_id'] = self.cat.get('documentId')
        item['category_name'] = self.cat.get('category_name')
        item['category_url'] = self.cat.get('category_url')
        item['title'] = response.css(self.config['title']).get()
        item['content'] = response.css(self.config['content']).get()
        item['external_publish_date'] = response.meta.get('external_publish_date')
        
        yield item