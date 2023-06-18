const typeDefs = `#graphql
  type Feed {
    summary: Story!
    stories: [Story]!
  }

  type Thread {
    subject: String!
    body: String!
  }

  type Story {
    id: ID!
    title: String!
    body: String!
    positiveSentiment: Int!
    neutralSentiment: Int!
    negativeSentiment: Int!
    citationStories: [CitationStory!]!
    storyTopics: [StoryTopic!]!
    threads: [Thread!]!
  }

  input StoryInput {
    title: String!
    body: String!
  }
`;

export default typeDefs;
