import StoryTopic from '../../models/StoryTopic';
import Topic from '../../models/Topic';

const topicResolvers = {
  Query: {
    async topics() {
      return await Topic.findAll();
    },
    async topic(_, { id }) {
      return await Topic.findOne({ where: { id } });
    },
  },
  Mutation: {
    async createTopic(_, { input }) {
      if (input.file !== "") {
        const url = "https://helmet-document-indexing.azurewebsites.net/llama"
        // make a post request to the url
        // get the response and set input.title
        // to the response
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            url: input.file,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        input.prompt = data
      }
      let topic = await Topic.create({
        title: input.title,
        prompt: input.prompt,
        file: input.file,
      });
      return topic;
    },
    async updateTopic(_, { id, input }) {
      await Topic.update(
        {
          title: input.title,
          prompt: input.prompt,
          file: input.file,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return await Topic.findOne({
        where: {
          id: id,
        },
      });
    },
    async createStoryTopic(_, { topicId, storyId, explanation }) {
      return await StoryTopic.create({
        story_id: storyId,
        topic_id: topicId,
        explanation,
      });
    },
    async deleteTopic(_, { topicId }) {
      await Topic.destroy({
        where: {
          id: topicId
        }
      });
      return topicId;
    }
  },
};

export default topicResolvers;
