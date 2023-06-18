const typeDefs = `#graphql
  type Topic {
    id: Int!
    title: String!
    prompt: String!
    file: String
    storyTopics: [StoryTopic!]!
  }

  type StoryTopic {
    id: ID!
    topic: Topic!
    story: Story!
    explanation: String!
  }

  input TopicInput {
    title: String!
    prompt: String!
    file: String
  }
`;

export default typeDefs;
