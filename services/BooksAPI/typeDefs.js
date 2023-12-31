const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book @key(fields: "id") @key(fields: "authorId") {
    id: ID!
    title: String!
    authorId: ID!
    pages: Int
    hardcover: Boolean # this is a required field of books2api, but not present in booksapi1
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

module.exports = typeDefs;
