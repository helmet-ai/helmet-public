from pathlib import Path
from llama_index import VectorStoreIndex, download_loader

PDFReader = download_loader("PDFReader")

loader = PDFReader()
documents = loader.load_data(file=Path("./article.pdf"))

index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query(
    "Identify the core business and propose topics of interest that could affect the success of this business in the marketplace."
)
print(response)

