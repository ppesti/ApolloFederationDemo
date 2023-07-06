const { gql } = require('apollo-server');

const typeDefs = gql`
    type Book @key(fields: "id") @key(fields: "authorId") {
    id: ID!
    title: String!
    authorId: ID!
    pages: Int
  }

  extend type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

module.exports = typeDefs;
