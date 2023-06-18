from typing import List

import numpy as np
import pinecone
from constants import PINECONE_KEY

TOPIC_NAMESPACE = "topic"
TOP_K = 10


class TopicDatabase:

    SCORE_THRESHOLD = 0.65

    def __init__(self):
        pinecone.init(api_key=PINECONE_KEY,
                      environment="asia-southeast1-gcp-free")
        self.index = pinecone.Index("helmet")

    def fetch_topics(self, embedding: np.ndarray) -> List[str]:
        return filter(
            lambda x: x.score > self.SCORE_THRESHOLD,
            self.index.query(top_k=TOP_K,
                             vector=embedding,
                             include_metadata=True,
                             namespace=TOPIC_NAMESPACE).matches)
