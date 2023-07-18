const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    authorId: ID!
    pages: Int
    hardcover: Boolean! # this field is only present in books2api
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

module.exports = typeDefs;
