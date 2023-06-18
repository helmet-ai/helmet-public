import Citation from '../../models/Citation';
import CitationStory from '../../models/CitationStory';
import Story from '../../models/Story';
import StoryTopic from '../../models/StoryTopic';
import Topic from '../../models/Topic';

const storyResolvers = {
  Query: {
    async feed() {
      return {
        summary: await Story.findOne(),
        stories: await Story.findAll(),
      };
    },
    async story(_, { id }) {
      return await Story.findOne({ where: { id } });
    },
  },
  Story: {
    async citationStories({ dataValues }) {
      return await CitationStory.findAll({
        where: { story_id: dataValues.id },
      });
    },
    async storyTopics({ dataValues }) {
      return await StoryTopic.findAll({ where: { story_id: dataValues.id } });
    },
  },
  Topic: {
    async storyTopics({ dataValues }) {
      return await StoryTopic.findAll({ where: { topic_id: dataValues.id } });
    },
  },
  CitationStory: {
    async story({ dataValues }) {
      return await Story.findOne({ where: { id: dataValues.story_id } });
    },
    async citation({ dataValues }) {
      return await Citation.findOne({ where: { id: dataValues.citation_id } });
    },
  },
  StoryTopic: {
    async story({ dataValues }) {
      return await Story.findOne({ where: { id: dataValues.story_id } });
    },
    async topic({ dataValues }) {
      return await Topic.findOne({ where: { id: dataValues.topic_id } });
    },
  },
  Mutation: {
    async createStory(_, { input }) {
      return await Story.create({
        title: input.title,
        body: input.body,
      });
    },
    async deleteStory(_, { storyId }) {
      await Story.destroy({
        where: {
          id: storyId
        }
      });
      return storyId;
    }
  },
};

export default storyResolvers;
