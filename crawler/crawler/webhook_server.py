import re
import os
from fastapi import FastAPI, Request
import subprocess
import uvicorn
import requests
from crawler.graphql_queries.category_service import FIND_KEY
from crawler.config import (
    UNIFEED_CMS_GRAPHQL_HOST,
    UNIFEED_CMS_GRAPHQL_PORT,
    UNIFEED_CMS_GRAPHQL_ENDPOINT,
    UNIFEED_CMS_GRAPHQL_TOKEN,
)

# Nếu GraphQL chạy trên Windows hoặc container khác thì sửa host:
app = FastAPI()

GRAPHQL_URL = f"http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/{UNIFEED_CMS_GRAPHQL_ENDPOINT}"
GRAPHQL_TOKEN = UNIFEED_CMS_GRAPHQL_TOKEN

def extract_url_from_message(message: str):
    match = re.search(r'https?://\S+', message)
    return match.group(0) if match else None

@app.post("/webhook/changedetection")
async def webhook(request: Request):
    try:
        payload = await request.json()
        url_to_crawl = extract_url_from_message(payload.get("message", ""))
        if not url_to_crawl:
            return {"error": "No valid URL found in message"}

        res = requests.post(
            GRAPHQL_URL,
            json={"query": FIND_KEY, "variables": {"url": url_to_crawl}},
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {GRAPHQL_TOKEN}",
            },
        )

        graph_data = res.json()
        if "errors" in graph_data or not graph_data.get("data") or not graph_data["data"]["categories"]:
            return {"error": "No category found for URL"}

        data = graph_data["data"]["categories"][0]
        key_departmentSource = data["department_source"]["key_departmentSource"]
        key_category = data["key_category"]
    
        subprocess.Popen(
            [
                "poetry", "run", "scrapy", "crawl", "iuh",
                "-a", f"key_departmentSource={key_departmentSource}",
                "-a", f"key_category={key_category}",
            ],
            cwd=os.path.join(os.path.dirname(__file__), "..")
        )

        return {"status": "started", "url": url_to_crawl}

    except Exception as e:
        print("Error in webhook:", e)
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
