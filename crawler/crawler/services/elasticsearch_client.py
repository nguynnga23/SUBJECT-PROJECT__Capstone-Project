import json
import time
from typing import List, Dict, Any

import requests

DEFAULT_TIMEOUT = 30


class ElasticsearchClient:
    """Client tối giản cho index và kNN dedup."""

    def __init__(self, host: str, index: str):
        self.host = host.rstrip("/")
        self.index = index

    def store_embedding(
        self,
        article_id: str,
        embedding: List[float],
        content_url: str,
        logger,
    ):
        doc = {
            "article_id": article_id,
            "url": content_url,
            "embedding": embedding,
            "timestamp": int(time.time()),
        }
        try:
            logger.info(
                f"STEP 7.1: Posting vector (dim={len(embedding)}) "
                f"for Article ID {article_id} to ES index {self.index}."
            )
            response = requests.post(
                f"{self.host}/{self.index}/_doc/{article_id}",
                headers={"Content-Type": "application/json"},
                data=json.dumps(doc),
                timeout=DEFAULT_TIMEOUT,
            )
            response.raise_for_status()
            logger.info(
                f"STEP 7.1 Success: Stored embedding for ID {article_id} in Elasticsearch."
            )
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"!!! Error storing embedding to Elasticsearch: {e}")
            return None

    def find_neighbors(self, query_vec: List[float], k: int = 3) -> List[Dict[str, Any]]:
        """
        Tìm k láng giềng gần nhất dùng script_score cosineSimilarity.
        Trả về list [{'article_id', 'embedding', 'score'~cosine}, ...]
        """
        try:
            body = {
                "size": k,
                "query": {
                    "script_score": {
                        "query": {"match_all": {}},
                        "script": {
                            "source": "cosineSimilarity(params.q, 'embedding') + 1.0",
                            "params": {"q": query_vec},
                        },
                    }
                },
                "_source": ["article_id", "url", "embedding"],
            }
            res = requests.post(
                f"{self.host}/{self.index}/_search",
                headers={"Content-Type": "application/json"},
                data=json.dumps(body),
                timeout=DEFAULT_TIMEOUT,
            )
            res.raise_for_status()
            hits = res.json().get("hits", {}).get("hits", [])
            out = []
            for h in hits:
                src = h.get("_source", {})
                out.append(
                    {
                        "article_id": src.get("article_id"),
                        "embedding": src.get("embedding"),
                        "score": (h.get("_score", 0.0) - 1.0),  # vì +1.0 trong script
                    }
                )
            return out
        except requests.exceptions.RequestException as e:
            print(f"!!! Error ES kNN search: {e}")
            return []
