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

app = FastAPI()

GRAPHQL_URL = f"http://{UNIFEED_CMS_GRAPHQL_HOST}:{UNIFEED_CMS_GRAPHQL_PORT}/{UNIFEED_CMS_GRAPHQL_ENDPOINT}"
GRAPHQL_TOKEN = UNIFEED_CMS_GRAPHQL_TOKEN


@app.post("/webhook/changedetection")
async def webhook(request: Request):
    payload = await request.json()
    url_to_crawl = payload.get("url")

    res = requests.post(
        GRAPHQL_URL,
        json={"query": FIND_KEY, "variables": {"url": url_to_crawl}},
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GRAPHQL_TOKEN}",
        },
    )

    data = res.json()["data"]["categories"][0]
    key_department = data["department_source"]["key_department"]
    key_category = data["key_category"]
    subprocess.Popen(
        [
            "poetry",
            "run",
            "scrapy",
            "crawl",
            "iuh",
            "-a",
            f"key_department={key_department}",
            "-a",
            f"key_category={key_category}",
        ],
        cwd="/path/to/your/scrapy/project",
    )

    return {"status": "started", "url": url_to_crawl}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
