from dataclasses import dataclass
import scrapy

# @dataclass  
class ArticleItem(scrapy.Item):
    # title: str
    # summary: str
    # thumbnail: str
    # category: str
    # department: str
    # content: str
    # external_slug: str
    # external_url: str
    # external_id: str
    # external_publish_date: str
    
    title = scrapy.Field()
    summary = scrapy.Field()
    thumbnail = scrapy.Field()
    category = scrapy.Field()
    department_name = scrapy.Field()
    department_url = scrapy.Field()
    content = scrapy.Field()
    external_slug = scrapy.Field()
    external_url = scrapy.Field()
    external_publish_date = scrapy.Field()