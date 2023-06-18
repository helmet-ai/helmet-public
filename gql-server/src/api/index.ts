import storyResolvers from './Story/resolver';
import Story from './Story/schema';
import topicResolvers from './Topic/resolver';
import Topic from './Topic/schema';
import Message from './Message/schema';
import Citation from './Citation/schema';
import messageResolvers from './Message/resolver';
import citationResolvers from './Citation/resolver';

export const Query = `#graphql
  type Query {
    feed: Feed!
    story(id: ID!): Story!
    topics: [Topic!]!
    topic(id: ID!): Topic!
    citations: [Citation!]!
  }
`;

export const Mutation = `#graphql
  type Mutation {
    createTopic(input: TopicInput!): Topic!
    updateTopic(id: ID!, input: TopicInput!): Topic!
    createCitation(input: CitationInput!): Citation!
    message(messages: [MessageInput]!): MessageResponse!
    createStory(input: StoryInput!): Story!
    createCitationStory(citationId: ID!, storyId: ID!, explanation: String!): CitationStory!
    createStoryTopic(topicId: ID!, storyId: ID!, explanation: String!): StoryTopic!
    deleteTopic(id: ID!): ID!
    deleteStory(id: ID!): ID!
  }
`;

export const resolvers = {
  Query: {
    ...storyResolvers.Query,
    ...topicResolvers.Query,
    ...citationResolvers.Query,
  },
  Story: storyResolvers.Story,
  Topic: storyResolvers.Topic,
  CitationStory: storyResolvers.CitationStory,
  StoryTopic: storyResolvers.StoryTopic,
  Mutation: {
    ...storyResolvers.Mutation,
    ...topicResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...citationResolvers.Mutation,
  },
};

export const typeDefs = [Story, Topic, Message, Citation, Query, Mutation];
