import logging
from typing import List

import openai
import tiktoken
from constants import OPENAI_LOGGER_NAME

logger = logging.getLogger(OPENAI_LOGGER_NAME)

# Load your API key from an environment variable or secret management service
openai.api_key = "#KEY"


def chat_api(prompt: str,
             max_tokens: int = 1000,
             model="gpt-3.5-turbo") -> str:
    encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
    num_tokens = len(encoding.encode(prompt))
    logger.info(f"Prompt has {num_tokens} tokens\n{prompt}")
    response = openai.ChatCompletion.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": prompt
            },
        ],
        max_tokens=max_tokens,
    )
    return response.choices[0]["message"]["content"]


def embed_api(text: str) -> List[float]:
    return openai.Embedding.create(
        input=[text], model="text-embedding-ada-002")['data'][0]['embedding']
