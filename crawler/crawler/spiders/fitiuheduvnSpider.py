import scrapy
import re
from crawler.items import ArticleItem

class Fitiuheduvn(scrapy.Spider):
    name = "fit.iuh.edu.vn"
    def __init__(self, *args, **kwargs):
        super(Fitiuheduvn, self).__init__(*args, **kwargs)
        self.allowed_domains = ["fit.iuh.edu.vn"]
        self.start_urls = [ "https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien", 
                                "https://fit.iuh.edu.vn/news.html@155@Thong-bao"]
      
    def parse(self, response):
         # Get list articles
        articles = response.css('.content')
        
        for article in articles:
            relative_url = article.css('.content-img a ::attr(href)').get()
            thumbnail_url = article.css('.content-img img::attr(src)').get()
            
            if relative_url:
                article_url = response.urljoin(relative_url)
                yield response.follow(article_url, callback=self.parse_article_page, meta={'thumbnail': thumbnail_url, 'root_url': response.url})
            return
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
        article_item['department'] = "fit.iuh.edu.vn"
        
        current_url = response.meta.get('root_url')
        
        if current_url == "https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien":
            article_item['category'] = "TIN TỨC - SỰ KIỆN"
        elif current_url == "https://fit.iuh.edu.vn/news.html@155@Thong-bao":
            article_item['category'] = "THÔNG BÁO SINH VIÊN"
        else:
            article_item['category'] = "THÔNG TIN KHÁC"
        
        match = re.search(r'-(a\d+)\.html$', response.url)   
        if match: 
            article_item['external_id'] = match.group(1)
        else:
            article_item['external_id'] = '0'
                        
        article_item['title'] = response.css('body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text').get()
        article_item['content'] = response.css('body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div').get()
        article_item['external_publish_date'] =  response.css('body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.title-date ::text').get()
        article_item['summary'] = response.css('body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div > p:first-of-type').get()
        
        article_item['thumbnail'] = response.meta.get('thumbnail')
        
        yield article_item

