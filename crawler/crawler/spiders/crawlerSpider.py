import scrapy
import json
from urllib.parse import urljoin
from datetime import datetime
from crawler.items import ArticleItem
from scrapy.exceptions import CloseSpider

class DynamicIUHSpider(scrapy.Spider):
    name = "iuh"
    custom_settings = {
        'DOWNLOAD_DELAY': 1,
    }

    def __init__(self, *args, **kwargs):
        self.key_max_pages = int(kwargs.pop('key_max_pages', 0)) or None
        self.key_department = kwargs.pop('key_department', None)
        self.key_category = kwargs.pop('key_category', None)

        self.page_counter = {}
        self.latest_dates = {}

        super().__init__(*args, **kwargs)

    def start_requests(self):
        with open('config.json', encoding='utf-8') as f:
            self.configs = json.load(f)

        for config in self.configs:
            dept = config.get('department', {})
            key_dept = dept.get('key_department')

            if self.key_department and key_dept != self.key_department:
                continue

            for start in config['start_url']:
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

    def parse_list(self, response):
        config = response.meta['config']
        start = response.meta['start']
        category = response.meta['category_name']
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
                            'category_name': category,
                            'thumbnail': thumbnail,
                            'department_name': response.meta.get('department_name'),
                            'department_url': response.meta.get('department_url'),
                            'external_publish_date': article_date.strftime("%Y-%m-%d")
                        }
                    )
                    requests.append(req)

            else:
                self.logger.info("🛑 TẤT CẢ bài trên trang hiện tại đều đã cũ → dừng crawler.")
                should_continue = False
                break

        for req in requests:
            yield req

        # Nếu chưa gặp bài trùng hoặc cũ, tiếp tục sang trang tiếp theo
        if should_continue:
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
        item['department_name'] = response.meta.get('department_name')
        item['department_url'] = response.meta.get('department_url')
        item['category'] = category
        item['title'] = response.css(config['title']).get()
        item['content'] = response.css(config['content']).get()
        item['external_publish_date'] = response.meta.get('external_publish_date')

        yield item

    def closed(self, reason):
        if not self.latest_dates:
            return

        with open('config.json', 'r', encoding='utf-8') as f:
            configs = json.load(f)

        for config in configs:
            key_dept = config['department']['key_department']
            for start in config['start_url']:
                key_cat = start['key_category']
                config_key = f"{key_dept}_{key_cat}"
                if config_key in self.latest_dates:
                    latest_date = self.latest_dates[config_key].strftime("%Y-%m-%d")
                    start['last_external_publish_date'] = latest_date
                    print(f"✅ Cập nhật ngày mới cho {config_key}: {latest_date}")

        with open('config.json', 'w', encoding='utf-8') as f:
            json.dump(configs, f, indent=2, ensure_ascii=False)
