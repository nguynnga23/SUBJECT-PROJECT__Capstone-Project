# Crawl data:

Crawl data with scraping information retrieved from config.js file

## Prerequisites
- Git
- WSL2 (Windows Subsystem for Linux) with Linux distro installed or MacOS
- Poetry
- CMS (running)

## Run crawler

Step 1: Update libs by poetry command:

```bash
poetry install
```
Step 2: Create .env file follow .env.sample, filling information (read guidance from cms/README.md to get UNIFEED_CMS_GRAPHQL_TOKEN):

```bash
poetry install
```

Step 3: Crawl data by command, all departments, all categories, all pages

```bash
poetry run scrapy crawl iuh
```

- (Optional) Crawl data with specific department like (iuh, fit) - all pages, all category, example:

```bash
poetry run scrapy crawl iuh -a key_department=iuh
```

- (Optional) Crawl data with specific category like [ttsk (Tin tức sự kiện), ttsv (Thông tin sinh viên)] - all pages, all department, example:

```bash
poetry run scrapy crawl iuh -a key_category=ttsk
```

- (Optional) Crawl data with specific page number - all department, all category

```bash
poetry run scrapy crawl iuh -a key_max_number=2
```

- (Optional) Crawl data with specific page number, category, department

```bash
poetry run scrapy crawl iuh -a key_department=iuh -a key_category=ttsk -a key_max_pages=2
```

