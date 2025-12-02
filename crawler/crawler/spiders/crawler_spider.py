# crawler/spiders/iuh_dynamic_spider.py

import scrapy
from datetime import datetime
from urllib.parse import urljoin
from scrapy.exceptions import CloseSpider
import requests

from crawler.items import ArticleItem
from crawler.config import (
    UNIFEED_CMS_GRAPHQL_HOST,
    UNIFEED_CMS_GRAPHQL_PORT,
    UNIFEED_CMS_GRAPHQL_ENDPOINT,
    UNIFEED_CMS_GRAPHQL_TOKEN,
)
from crawler.graphql_queries.crawler_config_service import GET_CRAWLER_CONFIG
from crawler.graphql_queries.category_service import UPDATE_LAST_DATE


class DynamicIUHSpider(scrapy.Spider):
    name = "iuh"

    custom_settings = {
        "DEFAULT_REQUEST_HEADERS": {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://fit.iuh.edu.vn/",
        }
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.category_url = kwargs.pop("category_url", None)

        self._graphql_url_endpoint = (
            f"http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/"
            f"{UNIFEED_CMS_GRAPHQL_ENDPOINT}"
        )
        self._token = UNIFEED_CMS_GRAPHQL_TOKEN

        self.page_counter: dict[str, int] = {}
        self.latest_dates: dict[str, datetime.date] = {}

        self.config = None
        self.dept = None
        self.cat = None

    # ------------------------------------------------------------------
    # 1. Lấy config crawler từ Strapi
    # ------------------------------------------------------------------
    def get_configs_from_strapi(self):
        try:
            res = requests.post(
                self._graphql_url_endpoint,
                json={
                    "query": GET_CRAWLER_CONFIG,
                    "variables": {"category_url": self.category_url},
                },
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {self._token}",
                },
                timeout=10,
            )
        except requests.RequestException as e:
            self.logger.error(f"[Strapi] Lỗi khi gọi GET_CRAWLER_CONFIG: {e}")
            return None

        if res.status_code != 200:
            self.logger.error(
                f"[Strapi] HTTP {res.status_code}: {res.text[:200]}"
            )
            return None

        data = res.json().get("data")
        if not data or "crawlerConfigs" not in data or not data["crawlerConfigs"]:
            self.logger.warning("[Strapi] Không có crawlerConfigs")
            return None

        return data["crawlerConfigs"]

    # ------------------------------------------------------------------
    # 2. Start crawl
    # ------------------------------------------------------------------
    def start_requests(self):
        self.logger.info(
            f"[START_REQUESTS] category_url={self.category_url}"
        )

        configs = self.get_configs_from_strapi()
        self.logger.info(f"[CONFIG] configs nhận về: {configs}")

        if not configs:
            raise CloseSpider("Không tìm thấy cấu hình crawler trong Strapi")

        self.config = configs[0]
        self.dept = self.config.get("department_source", {})

        cats = self.dept.get("categories", [])
        self.cat = None
        for a in cats:
            if a.get("category_url") == self.category_url:
                self.cat = a
                break

        if not self.cat:
            raise CloseSpider(f"Không tìm thấy category_url={self.category_url}")

        try:
            last = self.cat.get("last_external_publish_date", "2025-05-01")
            self.cat["last_external_publish_date"] = datetime.strptime(
                last, "%Y-%m-%d"
            ).date()
        except Exception as e:
            self.logger.warning(
                f"Lỗi parse last_external_publish_date, fallback 2025-05-01: {e}"
            )
            self.cat["last_external_publish_date"] = datetime.strptime(
                "2025-05-01", "%Y-%m-%d"
            ).date()

        category_url = self.cat["category_url"]
        self.page_counter[category_url] = 1

        self.logger.info(f"[START] Crawling category: {category_url}")

        yield scrapy.Request(
            url=category_url,
            callback=self.parse_list,
        )

    # ------------------------------------------------------------------
    # 3. Update last date về Strapi
    # ------------------------------------------------------------------
    def update_category_last_date(self, last_date):
        if not self.cat:
            return

        category_id = self.cat.get("documentId")
        current_last = self.cat.get("last_external_publish_date")

        try:
            if isinstance(current_last, str):
                current_last = datetime.strptime(current_last, "%Y-%m-%d").date()
        except Exception as e:
            self.logger.warning(f"Lỗi parse current_last date: {e}")
            current_last = None

        if current_last and current_last >= last_date:
            self.logger.info(
                f"⚠️ Không cần cập nhật vì ngày hiện tại ({current_last}) >= {last_date}"
            )
            return

        try:
            res = requests.post(
                self._graphql_url_endpoint,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {self._token}",
                },
                json={
                    "query": UPDATE_LAST_DATE,
                    "variables": {
                        "id": category_id,
                        "lastDate": last_date.strftime("%Y-%m-%d"),
                    },
                },
                timeout=10,
            )
            res.raise_for_status()
            self.logger.info(
                f"✅ Cập nhật {self.category_url} → {last_date.strftime('%Y-%m-%d')}"
            )
        except requests.RequestException as e:
            self.logger.error(f"❌ Lỗi cập nhật last date: {e}")

    # ------------------------------------------------------------------
    # 4. Parse trang list
    # ------------------------------------------------------------------
    def parse_list(self, response):
        self.logger.info(f"[PARSE_LIST] {response.url}")
        last_date = self.cat["last_external_publish_date"]
        
        if isinstance(last_date, str):
            last_date = datetime.strptime(last_date, "%Y-%m-%d").date()
        config_key = self.category_url

        current_page = self.page_counter.get(self.category_url, 0)
        self.page_counter[self.category_url] = current_page + 1

        articles = response.css(self.config["relative_url_list"])
        self.logger.info(f"Found {len(articles)} articles on page")

        should_continue = True
        requests_for_detail = []
        for article in articles:
            relative_url = article.css(self.config["relative_url"]).get()
            thumbnail = article.css(self.config["thumbnail"]).get()

            date_str = article.css(self.config["external_publish_date"]).get()
            if not date_str:
                self.logger.warning("❌ Không tìm thấy ngày đăng bài viết")
                continue
            
            try:
                normalized = date_str.strip().replace("/", "-")
                
                article_date = datetime.strptime(
                    normalized, "%d-%m-%Y"
                ).date()
            except Exception as e:
                self.logger.warning(
                    f"❌ Lỗi parse ngày: {date_str} | {e}"
                )
                continue

            self.logger.info(
                f"📅 {relative_url} => {article_date} vs last_date={last_date}"
            )

            if article_date >= last_date:
                if relative_url:
                    if relative_url.startswith("vi/"):
                        relative_url = relative_url[2:]
                    full_url = urljoin(response.url, relative_url)
                    if (
                        config_key not in self.latest_dates
                        or article_date > self.latest_dates[config_key]
                    ):
                        self.latest_dates[config_key] = article_date

                    req = scrapy.Request(
                        url=full_url,
                        callback=self.parse_detail,
                        meta={
                            "thumbnail": thumbnail,
                            "external_publish_date": article_date.strftime(
                                "%Y-%m-%d"
                            ),
                        },
                    )
                    requests_for_detail.append(req)
            else:
                self.logger.info(
                    "🛑 Tất cả bài trên trang hiện tại đều đã cũ → dừng pagination."
                )
                should_continue = False

                if config_key in self.latest_dates:
                    new_date = self.latest_dates[config_key]
                    self.update_category_last_date(new_date)

                break

        for req in requests_for_detail:
            yield req

        if should_continue:
            next_pages = response.css(self.config["next_pages"]).getall()
            if len(next_pages) >= current_page:
                next_page = next_pages[current_page - 1]
                if next_page.startswith("vi/"):
                    next_page = next_page[2:]

                next_page_url = urljoin(response.url, next_page)
                self.logger.info(f"[PAGINATION] Next page: {next_page_url}")
                yield scrapy.Request(
                    url=next_page_url,
                    callback=self.parse_list,
                )

    # ------------------------------------------------------------------
    # 5. Parse trang detail
    # ------------------------------------------------------------------
    def parse_detail(self, response):
        self.logger.info(f"[PARSE_DETAIL] {response.url}")

        # self.logger.info("external_url", response.url)
        # self.logger.info("external_slug", response.url.split("/")[-1])
        # self.logger.info("thumbnail", response.meta.get("thumbnail"))
        # self.logger.info("department_source_id", self.dept.get("documentId"))
        # self.logger.info("department_source_name", self.dept.get("label"))
        # self.logger.info("department_source_url", self.dept.get("url"))
        # self.logger.info("category_id", self.cat.get("documentId"))
        # self.logger.info("category_name", self.cat.get("category_name"))
        # self.logger.info("category_url", self.cat.get("category_url"))
        # self.logger.info("title", response.css(self.config["title"]).get())
        # self.logger.info("content", response.css(self.config["content"]).get())
        # self.logger.info("external_publish_date", response.meta.get("external_publish_date"))
        
        item = ArticleItem()
        
        item["external_url"] = response.url
        item["external_slug"] = response.url.split("/")[-1]
        item["thumbnail"] = response.meta.get("thumbnail")

        item["department_source_id"] = self.dept.get("documentId")
        item["department_source_name"] = self.dept.get("label")
        item["department_source_url"] = self.dept.get("url")

        item["category_id"] = self.cat.get("documentId")
        item["category_name"] = self.cat.get("category_name")
        item["category_url"] = self.cat.get("category_url")

        item["title"] = response.css(self.config["title"]).get()
        item["content"] = response.css(self.config["content"]).get()
        item["external_publish_date"] = response.meta.get("external_publish_date")
        
        yield item
