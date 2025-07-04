import scrapy
import json
from urllib.parse import urljoin
from crawler.items import ArticleItem

class DynamicIUHSpider(scrapy.Spider):
    name = "iuh" # Default name crawler
    custom_settings = { # Using Delay + Throttling
        'DOWNLOAD_DELAY': 1,
    }
    
    def __init__(self, *args, **kwargs):
        max_pages_arg = kwargs.pop('max_pages', None) #default crawl all pages while have no max_pages in crawler command
        self.max_pages = int(max_pages_arg) if max_pages_arg is not None else None
        self.page_counter = {}
        super().__init__(*args, **kwargs)
    
    def start_requests(self):
        #Read file JSON config
        with open('config.json', encoding='utf-8') as f:
            self.configs = json.load(f)
            
        for config in self.configs:
            for start in config['start_url']:
                key = start['url_category']
                self.page_counter[key] = 1
                yield scrapy.Request(
                    url=start['url_category'],
                    callback=self.parse_list,
                    meta={
                        'config': config,
                        'category_name': start['category_name'],
                        'base_url': config['url'],
                        'start_url_key': key
                    }
                )
    def parse_list(self, response):
        config = response.meta['config']
        category = response.meta['category_name']
        key = response.meta['start_url_key']
        
        current_page = self.page_counter.get(key, 1)
        
        #Crawl all article links
        articles = response.css(config['relative_url_list'])
        for article in articles:
            relative_url = article.css(config['relative_url']).get()
            thumbnail = article.css(config['thumbnail']).get()
            
            if relative_url:
                full_url = urljoin(response.url, relative_url)
                yield scrapy.Request(
                    url=full_url,
                    callback=self.parse_detail,
                    meta={
                        'config':config,
                        'category_name': category,
                        'thumbnail':thumbnail,
                    }
                )
                
                #Crawl pagination
                if self.max_pages is None or current_page < self.max_pages:
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
        item['department'] = config['department']
        item['category'] = category
        
        item['title'] = response.css(config['title']).get()
        item['content'] = response.css(config['content']).get()
        item['external_publish_date'] = response.css(config['external_publish_date']).get()
        item['summary'] = response.css(config['summary']).get()

        yield item