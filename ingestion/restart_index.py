import pinecone
from story_database import PINECONE_KEY

pinecone.init(api_key=PINECONE_KEY, environment="asia-southeast1-gcp-free")

try:
    print("Start Deleting index")
    pinecone.delete_index('helmet')
    print("Done Deleting index")
except:
    pass

print("Start Creating Index")
pinecone.create_index('helmet',
                      metric='cosine',
                      shards=1,
                      dimension=1536,
                      metadata_config={
                          "indexed": ["timestamp"],
                      })