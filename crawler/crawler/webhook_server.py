import re
import os
from fastapi import FastAPI, Request
import subprocess
import uvicorn
import requests
from fastapi.middleware.cors import CORSMiddleware
from crawler.graphql_queries.category_service import FIND_KEY
from crawler.config import (
    UNIFEED_CMS_GRAPHQL_HOST,
    UNIFEED_CMS_GRAPHQL_PORT,
    UNIFEED_CMS_GRAPHQL_ENDPOINT,
    UNIFEED_CMS_GRAPHQL_TOKEN,
)

# Nếu GraphQL chạy trên Windows hoặc container khác thì sửa host:
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hoặc ['http://localhost:3000'] nếu bạn muốn chặt chẽ hơn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        subprocess.Popen(
            [
                "poetry", "run", "scrapy", "crawl", "iuh",
                "-a", f"category_url={url_to_crawl}",
            ],
            cwd=os.path.join(os.path.dirname(__file__), "..")
        )

        return {"status": "started", "url": url_to_crawl}

    except Exception as e:
        print("Error in webhook:", e)
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
