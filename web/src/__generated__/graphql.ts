/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Citation = {
  __typename?: 'Citation';
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CitationInput = {
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CitationStory = {
  __typename?: 'CitationStory';
  citation: Citation;
  explanation: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  story: Story;
};

export type Feed = {
  __typename?: 'Feed';
  stories: Array<Maybe<Story>>;
  summary: Story;
};

export type MessageInput = {
  content: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  content: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCitation: Citation;
  createCitationStory: CitationStory;
  createStory: Story;
  createStoryTopic: StoryTopic;
  createTopic: Topic;
  message: MessageResponse;
  updateTopic: Topic;
};


export type MutationCreateCitationArgs = {
  input: CitationInput;
};


export type MutationCreateCitationStoryArgs = {
  citationId: Scalars['ID']['input'];
  explanation: Scalars['String']['input'];
  storyId: Scalars['ID']['input'];
};


export type MutationCreateStoryArgs = {
  input: StoryInput;
};


export type MutationCreateStoryTopicArgs = {
  explanation: Scalars['String']['input'];
  storyId: Scalars['ID']['input'];
  topicId: Scalars['ID']['input'];
};


export type MutationCreateTopicArgs = {
  input: TopicInput;
};


export type MutationMessageArgs = {
  messages: Array<InputMaybe<MessageInput>>;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID']['input'];
  input: TopicInput;
};

export type Query = {
  __typename?: 'Query';
  citations: Array<Citation>;
  feed: Feed;
  story: Story;
  topic: Topic;
  topics: Array<Topic>;
};


export type QueryStoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTopicArgs = {
  id: Scalars['ID']['input'];
};

export type Story = {
  __typename?: 'Story';
  body: Scalars['String']['output'];
  citationStories: Array<CitationStory>;
  id: Scalars['ID']['output'];
  negativeSentiment: Scalars['Int']['output'];
  neutralSentiment: Scalars['Int']['output'];
  positiveSentiment: Scalars['Int']['output'];
  storyTopics: Array<StoryTopic>;
  threads: Array<Thread>;
  title: Scalars['String']['output'];
};

export type StoryInput = {
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type StoryTopic = {
  __typename?: 'StoryTopic';
  explanation: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  story: Story;
  topic: Topic;
};

export type Thread = {
  __typename?: 'Thread';
  body: Scalars['String']['output'];
  subject: Scalars['String']['output'];
};

export type Topic = {
  __typename?: 'Topic';
  file?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  prompt: Scalars['String']['output'];
  storyTopics: Array<StoryTopic>;
  title: Scalars['String']['output'];
};

export type TopicInput = {
  file?: InputMaybe<Scalars['String']['input']>;
  prompt: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', id: number, title: string }>, feed: { __typename?: 'Feed', summary: { __typename?: 'Story', id: string, title: string, body: string }, stories: Array<{ __typename?: 'Story', id: string, title: string, body: string, storyTopics: Array<{ __typename?: 'StoryTopic', topic: { __typename?: 'Topic', id: number, title: string } }> } | null> } };

export type MessageMutationVariables = Exact<{
  messages: Array<InputMaybe<MessageInput>> | InputMaybe<MessageInput>;
}>;


export type MessageMutation = { __typename?: 'Mutation', message: { __typename?: 'MessageResponse', role: string, content: string } };

export type GetStoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetStoryQuery = { __typename?: 'Query', story: { __typename?: 'Story', id: string, title: string, body: string, storyTopics: Array<{ __typename?: 'StoryTopic', explanation: string, topic: { __typename?: 'Topic', id: number, title: string } }>, citationStories: Array<{ __typename?: 'CitationStory', citation: { __typename?: 'Citation', title: string, url: string } }> } };

export type GetTopicFeedQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTopicFeedQuery = { __typename?: 'Query', topic: { __typename?: 'Topic', id: number, title: string, storyTopics: Array<{ __typename?: 'StoryTopic', story: { __typename?: 'Story', id: string, title: string, body: string } }> } };

export type GetTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', id: number, title: string, prompt: string }> };

export type CreateTopicMutationVariables = Exact<{
  input: TopicInput;
}>;


export type CreateTopicMutation = { __typename?: 'Mutation', createTopic: { __typename?: 'Topic', id: number, title: string, prompt: string } };


export const GetFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"feed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"storyTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFeedQuery, GetFeedQueryVariables>;
export const MessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Message"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messages"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messages"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<MessageMutation, MessageMutationVariables>;
export const GetStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"story"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"storyTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"explanation"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"citationStories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"citation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetStoryQuery, GetStoryQueryVariables>;
export const GetTopicFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopicFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"storyTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTopicFeedQuery, GetTopicFeedQueryVariables>;
export const GetTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}}]}}]}}]} as unknown as DocumentNode<GetTopicsQuery, GetTopicsQueryVariables>;
export const CreateTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TopicInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}}]}}]}}]} as unknown as DocumentNode<CreateTopicMutation, CreateTopicMutationVariables>;