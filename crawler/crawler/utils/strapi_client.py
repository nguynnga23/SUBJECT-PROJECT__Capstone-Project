import requests
from datetime import datetime
import json

class StrapiClient:
    def __init__(self, host, port, endpoint, token):
        self._graphql_url_endpoint = f"http://{host}:{port}/{endpoint}"
        self._token = token
        self._headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

    def graphql_query(self, query, variables=None):
        response = requests.post(
            self._graphql_url_endpoint,
            json={"query": query, "variables": variables or {}},
            headers=self._headers,
            timeout=10,
        )
        response.raise_for_status()
        return response.json()

    def get_configs(self):
        query = """
            query {
                crawlerConfigs {
                    url
                    department {
                        key_department
                        department_url
                        department_name
                        categories {
                            key_category
                            category_url
                            category_name
                            last_external_publish_date
                        }
                    }
                    relative_url_list
                    relative_url
                    thumbnail
                    next_pages
                    title
                    content
                    external_publish_date
                }
            }
        """
        data = self.graphql_query(query)
        return data["data"]["crawlerConfigs"]

    def update_category_last_date(self, key_department, key_category, last_date: datetime):
        query_find = """
        query ($key: String!, $dept_key: String!) {
            categories(filters: {
                key_category: { eq: $key },
                department: { key_department: { eq: $dept_key } }
            }) {
                documentId
                last_external_publish_date
            }
        }
        """
        res = self.graphql_query(query_find, {'key': key_category, 'dept_key': key_department})
        categories = res.get("data", {}).get("categories", [])
        if not categories:
            print(f"❌ Không tìm thấy category: {key_department} / {key_category}")
            return
        category = categories[0]
        category_id = category["documentId"]
        current_last_date_str = category.get("last_external_publish_date")

        if current_last_date_str:
            try:
                current_last_date = datetime.strptime(current_last_date_str, "%Y-%m-%d").date()
                if current_last_date >= last_date:
                    print(f"⚠️ Không cần cập nhật vì ngày hiện tại ({current_last_date}) >= {last_date}")
                    return
            except Exception as e:
                print(f"❌ Lỗi phân tích ngày hiện tại: {e}")

        mutation = """
        mutation updateCategory($id: ID!, $lastDate: Date!) {
            updateCategory(documentId: $id, data: {
                last_external_publish_date: $lastDate
            }) {
                key_category,
                last_external_publish_date,
                documentId
            }
        }
        """
        variables = {
            "id": category_id,
            "lastDate": last_date.strftime("%Y-%m-%d")
        }
        self.graphql_query(mutation, variables)
        print(f"✅ Cập nhật {key_department}/{key_category} → {last_date.strftime('%Y-%m-%d')}")

