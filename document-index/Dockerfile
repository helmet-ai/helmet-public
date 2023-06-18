FROM python:3.10-bullseye

RUN apt-get update && apt-get install


ADD requirements.txt .
ADD run.sh .
ADD app.py .
ENV OPENAI_API_KEY="#KEY"

RUN python -m pip install -r requirements.txt

CMD ["sh", "run.sh"]
