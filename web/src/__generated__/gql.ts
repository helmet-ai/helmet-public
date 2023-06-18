/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\nquery GetFeed {\n  topics {\n    id\n    title\n  }\n  feed {\n    summary {\n      id\n      title\n      body\n    }\n    stories {\n      id\n      title\n      body\n      storyTopics {\n        topic {\n          id\n          title\n        }\n      }\n    }\n  }\n}\n": types.GetFeedDocument,
    "#graphql\nmutation Message($messages: [MessageInput]!) {\n  message(messages: $messages) {\n    role\n    content\n  }\n}\n": types.MessageDocument,
    "#graphql\nquery GetStory($id: ID!) {\n  story(id: $id) {\n    id\n    title\n    body\n    storyTopics {\n      explanation\n      topic {\n        id\n        title\n      }\n    }\n    citationStories {\n      citation {\n        title\n        url\n      }\n    }\n  }\n}\n": types.GetStoryDocument,
    "#graphql\nquery GetTopicFeed($id: ID!) {\n    topic(id: $id) {\n      id\n      title\n      storyTopics {\n        story {\n            id\n            title\n            body\n        }\n      }\n    }\n}\n": types.GetTopicFeedDocument,
    "#graphql\nquery GetTopics {\n  topics {\n    id\n    title\n    prompt\n  }\n}\n": types.GetTopicsDocument,
    "#graphql\nmutation CreateTopic($input: TopicInput!) {\n  createTopic(input: $input) {\n    id\n    title\n    prompt\n  }\n}\n": types.CreateTopicDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nquery GetFeed {\n  topics {\n    id\n    title\n  }\n  feed {\n    summary {\n      id\n      title\n      body\n    }\n    stories {\n      id\n      title\n      body\n      storyTopics {\n        topic {\n          id\n          title\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["#graphql\nquery GetFeed {\n  topics {\n    id\n    title\n  }\n  feed {\n    summary {\n      id\n      title\n      body\n    }\n    stories {\n      id\n      title\n      body\n      storyTopics {\n        topic {\n          id\n          title\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nmutation Message($messages: [MessageInput]!) {\n  message(messages: $messages) {\n    role\n    content\n  }\n}\n"): (typeof documents)["#graphql\nmutation Message($messages: [MessageInput]!) {\n  message(messages: $messages) {\n    role\n    content\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nquery GetStory($id: ID!) {\n  story(id: $id) {\n    id\n    title\n    body\n    storyTopics {\n      explanation\n      topic {\n        id\n        title\n      }\n    }\n    citationStories {\n      citation {\n        title\n        url\n      }\n    }\n  }\n}\n"): (typeof documents)["#graphql\nquery GetStory($id: ID!) {\n  story(id: $id) {\n    id\n    title\n    body\n    storyTopics {\n      explanation\n      topic {\n        id\n        title\n      }\n    }\n    citationStories {\n      citation {\n        title\n        url\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nquery GetTopicFeed($id: ID!) {\n    topic(id: $id) {\n      id\n      title\n      storyTopics {\n        story {\n            id\n            title\n            body\n        }\n      }\n    }\n}\n"): (typeof documents)["#graphql\nquery GetTopicFeed($id: ID!) {\n    topic(id: $id) {\n      id\n      title\n      storyTopics {\n        story {\n            id\n            title\n            body\n        }\n      }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nquery GetTopics {\n  topics {\n    id\n    title\n    prompt\n  }\n}\n"): (typeof documents)["#graphql\nquery GetTopics {\n  topics {\n    id\n    title\n    prompt\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nmutation CreateTopic($input: TopicInput!) {\n  createTopic(input: $input) {\n    id\n    title\n    prompt\n  }\n}\n"): (typeof documents)["#graphql\nmutation CreateTopic($input: TopicInput!) {\n  createTopic(input: $input) {\n    id\n    title\n    prompt\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;