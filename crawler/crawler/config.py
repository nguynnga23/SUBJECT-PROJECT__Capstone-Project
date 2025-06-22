import os
from typing import Final

UNIFEED_CMS_GRAPHQL_HOST: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_HOST') or 'localhost'
UNIFEED_CMS_GRAPHQL_PORT: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_PORT') or '1337'
UNIFEED_CMS_GRAPHQL_ENDPOINT: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_ENDPOINT') or '/graphql'
UNIFEED_CMS_GRAPHQL_TOKEN: Final[str] = os.getenv('UNIFEED_CMS_GRAPHQL_TOKEN')
