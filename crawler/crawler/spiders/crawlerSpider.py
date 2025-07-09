import scrapy
import json
from urllib.parse import urljoin
from datetime import datetime
from crawler.items import ArticleItem
from scrapy.exceptions import CloseSpider

class DynamicIUHSpider(scrapy.Spider):
    name = "iuh" # Default name crawler
    custom_settings = { # Using Delay + Throttling
        'DOWNLOAD_DELAY': 1,
    }
    
    def __init__(self, *args, **kwargs):
        # Mặc định crawl tất cả page khi không truyền bất key: key_max_pages
        key_max_pages_arg = kwargs.pop('key_max_pages', None) 
        self.key_max_pages = int(key_max_pages_arg) if key_max_pages_arg is not None else None
        # Mặc định crawl tất cả Department (toàn bộ object trong file JSON) nếu không truyền cụ thể chính xác key_department
        self.key_department = kwargs.pop('key_department', None)
        # Mặc định crawl tất cả Category (toàn bộ category trong object start_url) nếu không truyền cụ thể chính xác key_category
        self.key_category = kwargs.pop('key_category', None)
        
        self.page_counter = {}
        # 💡 Đọc ngày lưu trước đó
        self.last_crawled_date = self.load_last_crawled_date()
        self.latest_date_found = None
        
        super().__init__(*args, **kwargs)
        
        #Loggin các filter đang áp dụng
        if self.key_department:
            self.logger.info(f"*** Filtering by department: {self.key_department}")
        if self.key_category:
            self.logger.info(f"*** Filtering by category: {self.key_category}")
        if self.key_max_pages:
            self.logger.info(f"*** Max pages to crawl: {self.key_max_pages}")
        if self.last_crawled_date:
            self.logger.info(f"*** Last crawled date: {self.last_crawled_date}")
    
    def load_last_crawled_date(self):
        try:
            with open('last_crawled_date.json', encoding='utf-8') as f:
                data = json.load(f)
                return datetime.strptime(data.get('last_date'), "%Y-%m-%d").date()
        except:
            return None
        
    def save_last_crawled_date(self):
        if self.latest_date_found:
            with open('last_crawled_date.json', 'w', encoding='utf-8') as f:
                json.dump({"last_date": self.latest_date_found.strftime("%Y-%m-%d")}, f)
            self.logger.info(f"✅ Đã cập nhật ngày crawl mới nhất: {self.latest_date_found}")    
                
    
    def start_requests(self):
        #Đọc file config.json
        with open('config.json', encoding='utf-8') as f:
            self.configs = json.load(f)
            
        for config in self.configs:
            dept = config.get('department', {})
            key_dept = dept.get('key_department')
            
            # Nếu có truyền key_department, nhưng key không khớp -> bỏ qua
            if self.key_department and key_dept != self.key_department:
                continue
            
            for start in config['start_url']:
                #Nếu truyền key_category, chỉ crawl đúng mỗi category đó
                if self.key_category and start.get('key_category') != self.key_category:
                    continue
                
                category_url = start['category_url']
                self.page_counter[category_url] = 1
                
                yield scrapy.Request(
                    url=start['category_url'],
                    callback=self.parse_list,
                    meta={
                        'config': config,
                        'category_name': start['category_name'],
                        'department_name': dept.get('department_name', key_dept),
                        'department_url': dept.get('department_url', key_dept),
                        'key_department': key_dept,
                        'category_url': category_url
                    }
                )
    def parse_list(self, response):
        config = response.meta['config']
        category = response.meta['category_name']
        category_url = response.meta['category_url']
        
        current_page = self.page_counter.get(category_url, 1)
        # ✅ Tăng page lên 1
        self.page_counter[category_url] = current_page + 1
        
        #Crawl all article links
        articles = response.css(config['relative_url_list'])
        
        stop_crawling = False
        
        for article in articles:
            relative_url = article.css(config['relative_url']).get()
            thumbnail = article.css(config['thumbnail']).get()
            date_str = article.css(config['external_publish_date']).get()
            
            if not date_str:
                self.logger.warning("❌ Không tìm thấy ngày đăng bài viết")
                print("DATE:", relative_url)
                return
                continue

            try:
                article_date = datetime.strptime(date_str.strip(), "%d/%m/%Y").date()
            except Exception as e:
                self.logger.warning(f"❌ Lỗi parse ngày: {date_str} | {e}")
                continue
            
             # Ghi nhận ngày mới nhất gặp trong session này
            if not self.latest_date_found or article_date > self.latest_date_found:
                self.latest_date_found = article_date
                
            if self.last_crawled_date and article_date < self.last_crawled_date:
                self.logger.info(f"🛑 Gặp bài viết ngày {article_date} < {self.last_crawled_date}, dừng crawl...")
                stop_crawling = True
                break
            
            if relative_url:
                full_url = urljoin(response.url, relative_url)
                yield scrapy.Request(
                    url=full_url,
                    callback=self.parse_detail,
                    meta={
                        'config': config,
                        'category_name': category,
                        'thumbnail': thumbnail,
                        'department_name': response.meta.get('department_name'),
                        'department_url': response.meta.get('department_url'),
                    }
                )
        
        if stop_crawling:
            raise CloseSpider("Found old articles. Stop crawling.")
        
                #Crawl pagination
        if self.key_max_pages is None or current_page < self.key_max_pages:
            next_pages = response.css('.pagination > .number::attr(href)').getall()
            if next_pages:
                next_page_url = urljoin(response.url, next_pages[-1])
                yield scrapy.Request(
                    url=next_page_url,
                    callback=self.parse_list,
                    meta=response.meta
                )
        
    def parse_detail(self, response):
        config = response.meta['config']
        category = response.meta['category_name']

        item = ArticleItem()
        item['external_url'] = response.url
        item['external_slug'] = response.url.split('/')[-1]
        item['thumbnail'] = response.meta.get('thumbnail')
        item['department_name'] =  response.meta.get('department_name')
        item['department_url'] =  response.meta.get('department_url')
        item['category'] = category
        
        item['title'] = response.css(config['title']).get()
        item['content'] = response.css(config['content']).get()
        item['external_publish_date'] = response.css(config['external_publish_date']).get()

        yield item
        
    def closed(self, reason):
        self.save_last_crawled_date()