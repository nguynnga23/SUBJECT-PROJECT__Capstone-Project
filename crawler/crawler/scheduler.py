from apscheduler.schedulers.blocking import BlockingScheduler
import subprocess
import json
import time
import datetime

def load_interval_config():
    with open('crawl_config.json', encoding='utf-8') as f:
        config = json.load(f)
        interval_type = config["interval"]["type"]
        interval_value = config["interval"]["value"]
        return {interval_type: interval_value}
    
def crawl_job():
    print(f"[{datetime.datetime.now()}] Starting crawl...")
    subprocess.run(["poetry", "run", "scrapy", "crawl", "iuh"])
    print(f"[{datetime.datetime.now()}] ✅ Done crawling.")
    
if __name__ == '__main__':
    scheduler = BlockingScheduler()
    
    interval_args = load_interval_config()
    scheduler.add_job(crawl_job, trigger='interval', **interval_args)
    
    print(f"🕒 Scheduler started with interval: {interval_args}")
    scheduler.start()