FROM python:3.10-bullseye

RUN apt-get update && apt-get install
# RUN apt-get install build-dep python-psycopg2

ADD requirements.txt .
ADD constants.py .
ADD main.py .
ADD openai_client.py .
ADD parse_articles.py .
ADD restart_index.py .
ADD story_database.py .
ADD story.py .
ADD topic_database.py .
ADD run.sh .

RUN python -m pip install -r requirements.txt

CMD ["sh", "run.sh"]
