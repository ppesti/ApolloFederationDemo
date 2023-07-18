const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    authorId: ID!
    pages: Int
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

module.exports = typeDefs;
