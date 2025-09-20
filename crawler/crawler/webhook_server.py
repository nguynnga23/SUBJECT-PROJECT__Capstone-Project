from fastapi import FastAPI, Request
import subprocess
import uvicorn

app = FastAPI()

@app.post("/webhook/changedetection")
async def webhook(request: Request):
    payload = await request.json()
    url_to_crawl = payload.get("url")
    key_department = payload.get("key_department")
    key_category = payload.get("key_category")
    # Gọi scrapy spider bằng subprocess
    subprocess.Popen([
        "poetry", "run", "scrapy", "crawl", "iuh", 
        "-a", f"key_department={key_department}", 
        "-a", f"key_category={key_category}"
    ])

    return {"status": "started", "url": url_to_crawl}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)