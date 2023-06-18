from flask import Flask, jsonify
import wget
from flask import request
from pathlib import Path
from llama_index import VectorStoreIndex, download_loader
import openai
import logging
import os

PDFReader = download_loader("PDFReader")
app = Flask(__name__)
openai.api_key = "#KEY"
logging.basicConfig(level=logging.INFO, filemode="w")

@app.route('/llama', methods=['POST'])
def llama():
    url = request.get_json()['url']
    wget.download(url, 'doc.pdf')
    loader = PDFReader()
    documents = loader.load_data(file=Path("./doc.pdf"))
    index = VectorStoreIndex.from_documents(documents)
    query_engine = index.as_query_engine()
    response = query_engine.query(
        "Identify the core business and propose topics of interest that could affect the success of this business in the marketplace."
    )
    logging.info(response.response)
    os.remove("doc.pdf")
    return jsonify(response.response)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=False)