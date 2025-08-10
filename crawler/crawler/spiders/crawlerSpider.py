import scrapy
from urllib.parse import urljoin
from datetime import datetime

from crawler.items import ArticleItem
from crawler.config.config import (
    UNIFEED_CMS_GRAPHQL_HOST,
    UNIFEED_CMS_GRAPHQL_PORT,
    UNIFEED_CMS_GRAPHQL_ENDPOINT,
    UNIFEED_CMS_GRAPHQL_TOKEN,
)

from crawler.utils.strapi_client import StrapiClient
from crawler.utils.utils import parse_date, full_url, make_config_key

class DynamicIUHSpider(scrapy.Spider):
    name = "iuh"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.client = StrapiClient(
            UNIFEED_CMS_GRAPHQL_HOST,
            UNIFEED_CMS_GRAPHQL_PORT,
            UNIFEED_CMS_GRAPHQL_ENDPOINT,
            UNIFEED_CMS_GRAPHQL_TOKEN,
        )

        self.key_max_pages = int(kwargs.pop("key_max_pages", 0)) or None
        self.key_department = kwargs.pop("key_department", None)
        self.key_category = kwargs.pop("key_category", None)

        self.page_counter = {}
        self.latest_dates = {}

    def get_configs_from_strapi(self):
        return self.client.get_configs()

    def start_requests(self):
        self.configs = self.get_configs_from_strapi()

        for config in self.configs:
            dept = config.get("department", {})
            key_dept = dept.get("key_department")

            if self.key_department and key_dept != self.key_department:
                continue

            for start in dept.get("categories", []):
                if self.key_category and start.get("key_category") != self.key_category:
                    continue

                start["last_external_publish_date"] = parse_date(
                    start.get("last_external_publish_date", "2025-05-01"),
                    fmt="%Y-%m-%d",
                    default_date="2025-05-01",
                )
                category_url = start["category_url"]
                self.page_counter[category_url] = 1

                yield scrapy.Request(
                    url=category_url,
                    callback=self.parse_list,
                    meta={
                        "config": config,
                        "start": start,
                        "category_name": start["category_name"],
                        "department_name": dept.get("department_name", key_dept),
                        "department_url": dept.get("department_url", key_dept),
                        "key_department": key_dept,
                        "key_category": start.get("key_category"),
                        "category_url": category_url,
                        "last_external_publish_date": start["last_external_publish_date"],
                    },
                )

    def update_category_last_date(self, key_department, key_category, last_date):
        self.client.update_category_last_date(key_department, key_category, last_date)

    def parse_list(self, response):
        config = response.meta["config"]
        category_name = response.meta["category_name"]
        category_url = response.meta["category_url"]
        key_dept = response.meta["key_department"]
        key_cat = response.meta["key_category"]
        last_date = response.meta["last_external_publish_date"]

        config_key = make_config_key(key_dept, key_cat)
        current_page = self.page_counter.get(category_url, 1)
        self.page_counter[category_url] = current_page + 1

        articles = response.css(config["relative_url_list"])
        should_continue = True
        requests = []

        for article in articles:
            relative_url = article.css(config["relative_url"]).get()
            thumbnail = article.css(config["thumbnail"]).get()
            date_str = article.css(config["external_publish_date"]).get()

            if not date_str:
                self.logger.warning("❌ Không tìm thấy ngày đăng bài viết")
                continue

            article_date = parse_date(date_str, fmt="%d-%m-%Y")

            self.logger.info(f"📅 {relative_url} => {article_date} vs {last_date}")

            if article_date >= last_date:
                if config_key not in self.latest_dates or article_date > self.latest_dates[config_key]:
                    self.latest_dates[config_key] = article_date

                if relative_url:
                    full_article_url = full_url(response.url, relative_url)
                    req = scrapy.Request(
                        url=full_article_url,
                        callback=self.parse_detail,
                        meta={
                            "config": config,
                            "category_name": category_name,
                            "category_url": category_url,
                            "thumbnail": thumbnail,
                            "department_name": response.meta.get("department_name"),
                            "department_url": response.meta.get("department_url"),
                            "external_publish_date": article_date.strftime("%Y-%m-%d"),
                        },
                    )
                    requests.append(req)

            else:
                self.logger.info("🛑 Tất cả bài trên trang hiện tại đều đã cũ → dừng crawler.")
                should_continue = False
                if config_key in self.latest_dates:
                    new_date = self.latest_dates[config_key]
                    self.update_category_last_date(key_dept, key_cat, new_date)
                break

        for req in requests:
            yield req

        if should_continue:
            next_pages = response.css(config["next_pages"]).getall()
            if next_pages:
                next_page_url = full_url(response.url, next_pages[-1])
                yield scrapy.Request(url=next_page_url, callback=self.parse_list, meta=response.meta)

    def parse_detail(self, response):
        config = response.meta["config"]

        item = ArticleItem()
        item["external_url"] = response.url
        item["external_slug"] = response.url.split("/")[-1]
        item["thumbnail"] = response.meta.get("thumbnail")
        item["department_name"] = response.meta.get("department_name")
        item["department_url"] = response.meta.get("department_url")
        item["category_name"] = response.meta["category_name"]
        item["category_url"] = response.meta["category_url"]
        item["title"] = response.css(config["title"]).get()
        item["content"] = response.css(config["content"]).get()
        item["external_publish_date"] = response.meta.get("external_publish_date")

        yield item
