import scrapy
import re
from crawler.items import ArticleItem

class Iuheduvn(scrapy.Spider):
    name = "iuh.edu.vn"
    def __init__(self, *args, **kwargs):
        super(Iuheduvn, self).__init__(*args, **kwargs)
        self.allowed_domains = ["iuh.edu.vn"]
        self.start_urls = [ "https://iuh.edu.vn/vi/thong-bao-fi20", 
                                "https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11"]
      
    def parse(self, response):
         # Get list articles
        articles = response.css('.content')
        
        for article in articles:
            relative_url = article.css('.content-img a ::attr(href)').get()
            thumbnail_url = article.css('.content-img img::attr(src)').get()
            
            if relative_url:
                article_url = response.urljoin(relative_url)
                yield response.follow(article_url, callback=self.parse_article_page, meta={'thumbnail': thumbnail_url, 'root_url': response.url})
            # return
        # Go to nextpage to crawl
        # next_page = response.css('.pagination > .number::attr(href)').getall()
        # if next_page:
            # next_page_url = response.urljoin(next_page[-1])  
            # yield response.follow(next_page_url, callback=self.parse)
        # else:
            # self.current_config = None
    
    def parse_article_page(self, response):
        article_item = ArticleItem()
        article_item['external_url'] = response.url
        
        path_segments = response.url.split('/')
        article_item['external_slug'] = path_segments[-1] 
        article_item['department'] = "iuh.edu.vn"
        
        current_url = response.meta.get('root_url')
        
        if current_url == "https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11":
            article_item['category'] = "TIN TỨC - SỰ KIỆN"
        elif current_url == "https://iuh.edu.vn/vi/thong-bao-fi20":
            article_item['category'] = "THÔNG BÁO SINH VIÊN"
        else:
            article_item['category'] = "THÔNG TIN KHÁC"
        
        match = re.search(r'-(a\d+)\.html$', response.url)   
        if match: 
            article_item['external_id'] = match.group(1)
        else:
            article_item['external_id'] = '0'
                        
        article_item['title'] = response.css('#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text').get()
        article_item['content'] = response.css('#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail').get()
        article_item['external_publish_date'] =  response.css('#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 > span ::text').get()
        article_item['summary'] = response.css('#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail > p:first-of-type').get()
        
        article_item['thumbnail'] = response.meta.get('thumbnail')
        
        yield article_item

