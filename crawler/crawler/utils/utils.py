from urllib.parse import urljoin
from datetime import datetime

def parse_date(date_str, fmt="%d-%m-%Y", default_date="2025-05-01"):
    try:
        return datetime.strptime(date_str.strip(), fmt).date()
    except Exception:
        return datetime.strptime(default_date, "%Y-%m-%d").date()

def full_url(base_url, relative_url):
    return urljoin(base_url, relative_url)

def make_config_key(dept_key, cat_key):
    return f"{dept_key}_{cat_key}"
