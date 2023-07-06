const { gql } = require('apollo-server');

const typeDefs = gql`
    extend type Book @key(fields: "authorId") {
        authorId: ID! @external
        author: Author
    }

    type Author @key(fields: "id") {
        id: ID!
        name: String!
    }

    extend type Query {
        authors: [Author]
        author(id: ID!): Author
    }
`;

module.exports = typeDefs;
