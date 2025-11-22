# crawler/services/vertex_ai_embedder.py

import os
from typing import List

from google.cloud import aiplatform_v1


class VertexAIEmbedder:
    def __init__(
        self,
        project_id: str | None = None,
        location: str | None = None,
        model_name: str | None = None,
    ):
        self.project_id = project_id or os.environ.get("VERTEX_PROJECT_ID")
        self.location = location or os.environ.get("VERTEX_LOCATION", "us-central1")
        self.model_name = model_name or os.environ.get(
            "VERTEX_EMBED_MODEL", "textembedding-gecko@001"
        )

    def embed(self, text: str) -> List[float]:
        if not text or not text.strip():
            return []

        client = aiplatform_v1.PredictionServiceClient()
        endpoint = (
            f"projects/{self.project_id}"
            f"/locations/{self.location}"
            f"/publishers/google/models/{self.model_name}"
        )
        instance = {"content": text[:8000]}

        try:
            response = client.predict(
                endpoint=endpoint,
                instances=[instance],
                timeout=60.0,
            )
            vec = list(response.predictions[0]["embeddings"]["values"])
            return vec
        except Exception as e:
            print(f"❌ Error during Vertex AI embedding: {e}")
            return []
