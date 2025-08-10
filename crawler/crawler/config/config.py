import os
from dotenv import load_dotenv
from typing import Final

# BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# load_dotenv(os.path.join(BASE_DIR, ".env"))
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
load_dotenv(dotenv_path)

print("HOST:", os.getenv("UNIFEED_CMS_GRAPHQL_HOST"))
print("TOKEN:", os.getenv("UNIFEED_CMS_GRAPHQL_TOKEN"))

UNIFEED_CMS_GRAPHQL_HOST: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_HOST') or 'localhost'
UNIFEED_CMS_GRAPHQL_PORT: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_PORT') or '1337'
UNIFEED_CMS_GRAPHQL_ENDPOINT: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_ENDPOINT') or 'graphql'
UNIFEED_CMS_GRAPHQL_TOKEN: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_TOKEN')
