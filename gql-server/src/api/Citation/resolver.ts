import Citation from '../../models/Citation';
import CitationStory from '../../models/CitationStory';

const citationResolvers = {
  Query: {
    async citations() {
      return (await Citation.findAll()).map((citation) => ({
        ...citation.dataValues,
        body: citation.body ?? '',
      }));
    },
  },
  Mutation: {
    async createCitation(_, { input }) {
      return await Citation.create({
        title: input.title,
        body: input.body,
        url: input.url,
      });
    },
    async createCitationStory(_, { storyId, citationId, explanation }) {
      return await CitationStory.create({
        story_id: storyId,
        citation_id: citationId,
        explanation,
      });
    },
  },
};

export default citationResolvers;
