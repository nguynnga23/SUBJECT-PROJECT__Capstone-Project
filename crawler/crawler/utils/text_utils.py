
import hashlib
import math
from typing import List


def content_hash(title: str, markdown: str) -> str:
    t = (title or "").strip()
    c = (markdown or "").strip()
    return hashlib.sha256((t + "\n" + c).encode("utf-8")).hexdigest()


def cosine(a: List[float], b: List[float]) -> float:
    if not a or not b or len(a) != len(b):
        return -1.0
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x * x for x in a)) or 1e-9
    nb = math.sqrt(sum(y * y for y in b)) or 1e-9
    return dot / (na * nb)
