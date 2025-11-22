# crawler/pipelines/article_pipeline.py

import requests
from itemadapter import ItemAdapter

from crawler.config import SPRING_BOOT_URL  # nếu chưa có thì em có thể đặt thẳng URL ở đây


class ArticlePipeline:
    """
    Pipeline 1: clean title + (optional) tóm tắt nội dung.
    """

    def _clean_title(self, adapter: ItemAdapter):
        title = adapter.get("title", "")
        cleaned_title = title.replace("\r\n", " ").strip()
        adapter["title"] = cleaned_title

    def _summarize_text_ai(self, adapter: ItemAdapter, spider):
        """Gọi Spring Boot để tóm tắt nội dung (Gemini)."""
        article_content = adapter.get("content", "")
        if not article_content:
            adapter["summary"] = "Nội dung trống, không thể tóm tắt."
            return

        try:
            payload = {"articleContent": article_content}
            response = requests.post(
                SPRING_BOOT_URL,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=45,
            )
            if response.status_code == 200:
                summary_data = response.json()
                adapter["summary"] = summary_data.get(
                    "summary",
                    "Lỗi: Không tìm thấy trường 'summary' từ Spring AI.",
                )
                spider.logger.info(f"Tóm tắt AI thành công cho: {adapter.get('title')}")
            else:
                adapter["summary"] = f"Lỗi HTTP {response.status_code} từ Spring AI."
                spider.logger.warning(
                    f"Lỗi tóm tắt AI: {response.status_code}. Chi tiết: {response.text}"
                )
        except requests.exceptions.RequestException as e:
            adapter["summary"] = f"Lỗi kết nối dịch vụ Spring Boot: {e}"
            spider.logger.error(f"Lỗi kết nối API tóm tắt: {e}")

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        self._clean_title(adapter)
        # không gọi summarize ở đây, để CMSPipeline gọi sau khi dedup
        return item
