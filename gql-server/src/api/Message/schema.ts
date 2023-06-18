const typeDefs = `#graphql
  type MessageResponse {
    role: String!
    content: String!
  }

  input MessageInput {
    role: String!
    content: String!
  }
`;

export default typeDefs;
