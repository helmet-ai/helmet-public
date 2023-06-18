const typeDefs = `#graphql
    type Citation {
        id: ID!
        title: String!
        body: String!
        url: String!
    }

    type CitationStory {
        id: ID!
        citation: Citation!
        story: Story!
        explanation: String!
    }

    input CitationInput {
        title: String!
        body: String!
        url: String!
    }
`;

export default typeDefs;
