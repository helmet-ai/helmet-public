import json
import logging
import os
import ssl
from typing import List, Optional, Tuple

import constants as c
import feedparser
import mindsdb_sdk
import pandas as pd
from parse_articles import clean_content
from story import Article, Story
from story_database import StoryDatabase, Topic

# Create MindsDB client
mindsdb_server = mindsdb_sdk.connect(login="#LOGIN",
                                     password="#PASS")
mindsdb_project = mindsdb_server.get_project()
argument_model = mindsdb_project.get_model("argument_table2")

logging.basicConfig(level=logging.INFO, filemode="w")

# Disable SSL certificate verification
ssl._create_default_https_context = ssl._create_unverified_context

tech_rss_feeds = [
    "https://techcrunch.com/feed/", # techcrunch
    # "https://hnrss.org/frontpage", # hacker news
    # "https://rss.nytimes.com/services/xml/rss/nyt/PersonalTech.xml", # nytimes personal tech
]
general_news_rss_feeds = [
    "https://www.huffpost.com/section/front-page/feed?x=1", # huffpost
    "https://cdn.feedcontrol.net/8/1114-wioSIX3uu8MEj.xml", # reuters
    # "http://rss.cnn.com/rss/cnn_topstories.rss:=", # cnn
    "https://feeds.feedblitz.com/_/20/590538120/UsatodaycomNation-TopStories", #usa today
]

politics_rss_feeds = [
    # "https://feeds.megaphone.fm/EMPBC2962078635", # lincoln_project
    # "http://www.politico.com/rss/politicopicks.xml" # politico
]
fashion_rss_feeds = [
    # "https://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml" # nytimes fashion
]

health_rss_feeds = [
    # "https://www.nytimes.com/services/xml/rss/nyt/Health.xml" # nytimes health
]
sports_rss_feeds = [
    # "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml" # nytimes sports
]

rss_feeds = tech_rss_feeds + politics_rss_feeds + health_rss_feeds + sports_rss_feeds + fashion_rss_feeds + general_news_rss_feeds

num_entries_per_feed = {feed: 0 for feed in rss_feeds}
story_database = StoryDatabase()

main_logger = logging.getLogger(c.MAIN_LOGGER_NAME)
feed_logger = logging.getLogger(c.FEED_LOGGER_NAME)


def main():
    print("Starting main...")
    # while True:
    print("Here")
    new_stories = []
    new_articles = []
    topics = []

    try:
        new_articles = get_new_articles()
    except Exception as e:
        pass
    
    try:
        new_stories = process_new_articles(new_articles)
    except Exception as e:
        pass
    
    try:
        topics = story_database.get_all_topics()
    except Exception as e:
        pass

    for story in new_stories:
        update_topic(story, topics)
    main_logger.info(
        "Finished processing new articles. Waiting for more...")


def get_new_articles() -> List[Article]:
    new_articles: List[Article] = []
    for rss_url in rss_feeds:
        feed = feedparser.parse(rss_url)
        num_entries = num_entries_per_feed[rss_url]
        new_entries = []
        if len(feed.entries) > num_entries:
            new_entries = feed.entries[num_entries:]
            num_entries_per_feed[rss_url] = len(feed.entries)

        for i, entry in enumerate(new_entries):
            if i > 5:
                break
            feed_logger.info("New Entry:")
            feed_logger.info("Title: %s", entry.title)
            feed_logger.info("Link: %s", entry.link)

            content = ""
            if "content" in entry:
                content = entry.content[0].value
            elif "summary" in entry:
                content = entry.summary
            cleaned_content = clean_content(content)
            if len(cleaned_content) < 300:
                feed_logger.info("Skipping article (too short)")
                continue

            feed_logger.info("-" * 50)
            article = Article(entry.title, cleaned_content, entry.link)
            new_articles.append(article)
    return new_articles


def process_new_articles(new_articles: List[Article]) -> List[Story]:
    new_stories = []
    for article in new_articles:
        article_id, article_embedding = story_database.process_article(article)
        story = story_database.find_most_similar_story(article_embedding)
        if not story:
            main_logger.info("*** Hot new story! ***")
            story = Story(article)
            story_database.add_story(story)
            new_stories.append(story)
        else:
            main_logger.info("*** Found a similar story! ***")
            feed_logger.info("Adding article (%s) to story (%s)",
                             article.title, story.title)
            story_database.update_story(story, article)
        story_database.add_article_to_story(story.id, article_id)
    return new_stories


def get_story_argument(story: Story, topic: str) -> Optional[str]:
    prompt = f"""Write a convincing explanation for why the following story is relevant to the topic the user is interested in.

    You should provide a very prescriptive explanation about why this news update is important and think creatively about why this matters, even if it is not immediately obvious.
    However, if you are sure that this story is not relevant to this topic. Then feel free to say so. Only share arguments that
    you are very, very confident in based on your complete knowledge of the world. If you don't have a great argument, feel free to say so.
    Ideally, your explanation would contain action items for the user to take whether it be concrete actions or next steps for items to research.
    The tone of the response should be like you are talking to the user and be very direct. It should tell the user exactly what to do. If you don't have
    concrete action items, then you don't have a good reason.
    You can assume that the user is a very busy person who is looking for a quick summary of why this story is relevant to them.
    Do not try to convince the user the story is relevant just for the sake of it. Your goal is to not waste the user's time. Vague directives are not acceptable.
    You should assume the user is very knowledge about the topic of interest and is looking for specific, actionable items, not general advice and guidance.
    You must be very specific and provide unique insights the user could derive from the story.
    Just because an article is a similar field to the topic, does not mean it is relevant. 
    Don't focus as much on summarizing the story, but moreso on telling the user what to do because of the story.
    Any uncertainity about the article being directly relevant to the topic should be expressed in the response.
    To make sure you are unbiased, you must write an argument both for and against the story being relevant. Be unwavering when arguing for either side. Then evaluate both arguments and decide which one is stronger.
    
    Your output should following the format used in below examples:

    Topic: I am the owner of a burger restaurant.
    Title: Locusts are on the rise!
    Summary: Locusts are on the rise in the United States. They are destroying crops and causing billions of dollars in damage. The government is trying to stop them, but they are spreading faster than ever before.
    Output: {{
        "for": "Due to the recent locusts outbreak, the price of wheat is expected to increase by 20% in the next 3 months. You should buy wheat futures to hedge against this risk.",
        "against": "It is not reasonable to care about insects as a business owner."
        "is_relevant": true
    }}

    Topic: I am a computer vision researcher, specifically interested in scene segmentation.
    Title: Bottom-Up and Top-Down Attention for Image Captioning and Visual Question Answering
    Summary: Top-down visual attention mechanisms have been used extensively in image captioning and visual question answering (VQA) to enable deeper image understanding through fine-grained analysis and even multiple steps of reasoning. In this work, we propose a combined bottom-up and top-down attention mechanism that enables attention to be calculated at the level of objects and other salient image regions. This is the natural basis for attention to be considered. Within our approach, the bottom-up mechanism (based on Faster R-CNN) proposes image regions, each with an associated feature vector, while the top-down mechanism determines feature weightings. Applying this approach to image captioning, our results on the MSCOCO test server establish a new state-of-the-art for the task, achieving CIDEr / SPICE / BLEU-4 scores of 117.9, 21.5 and 36.9, respectively. Demonstrating the broad applicability of the method, applying the same approach to VQA we obtain first place in the 2017 VQA Challenge.
    Output: {{
        "for": "VQA is a computer vision field, but it is not very related to the projects you are working on in scene segmentation.",
        "against": "There is a lot of overlap in methods used in different computer vision fields. Reading about methods in other subdomains may inspire you to come up with new ideas for your own work.",
        "is_relevant": false
    }}

    Topic: {topic}
    Title: {story.title}
    Summary: {story.summary}
    Output:
    """
    try:
        # Querying OpenAI API directly
        # json_res = chat_api(prompt)

        # Using mindsdb
        data = pd.DataFrame({
            "topic": [topic],
            "title": [story.title],
            "summary": [story.summary]
        })
        json_res = argument_model.predict(data)["response"][0]

        output = json.loads(json_res)

    except json.decoder.JSONDecodeError:
        print("Error decoding JSON: ", json_res)
        return

    if output["is_relevant"]:
        return output["for"]


def update_topic(story: Story, topics: List[Topic]):
    main_logger.info("Updating topics for story (%s)", story.title)
    relevant_topics: List[Tuple[str, str]] = []
    for topic in topics:
        argument = get_story_argument(story, topic)
        if argument:
            relevant_topics.append((topic.id, argument))
            story_database.add_story_to_topic(story.id, topic.id, argument)

    main_logger.info("Finished updating topics for story (%s)", story.title)


if __name__ == "__main__":
    # remove all old *log files
    os.system("rm *.log")
    for logger_name in c.LOGGERS:
        logger = logging.getLogger(logger_name)
        file_handler = logging.FileHandler(f"{logger_name}.log")
        logger.addHandler(file_handler)
    main()
