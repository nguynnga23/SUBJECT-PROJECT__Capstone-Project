from dataclasses import dataclass
import scrapy

# @dataclass  
class ArticleItem(scrapy.Item):
 
    title = scrapy.Field()
    summary = scrapy.Field()
    thumbnail = scrapy.Field()
    content = scrapy.Field()
    external_url = scrapy.Field()
    external_publish_date = scrapy.Field()
    
    external_slug = scrapy.Field()
    
    category_id = scrapy.Field()
    category_name = scrapy.Field()
    category_url = scrapy.Field()
    
    department_source_id = scrapy.Field()
    department_source_name = scrapy.Field()
    department_source_url = scrapy.Field()
