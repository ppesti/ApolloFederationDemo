const { gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");

// TODO: fetch data from db
const books = [
  { id: "b1", title: "To Kill a Mockingbird", authorId: "a1", pages: 281 },
  { id: "b2", title: "1984", authorId: "a2", pages: 328 },
  { id: "b3", title: "Pride and Prejudice", authorId: "a3", pages: 279 },
  { id: "b4", title: "The Great Gatsby", authorId: "a4", pages: 180 },
  { id: "b5", title: "The Lord of the Rings", authorId: "a5", pages: 1216 },
];

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

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    book: (_, args) => {
      return books.find((p) => p.id == args.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4003 }, () => {
  console.log(`Server ready at http://localhost:4003${server.graphqlPath}`);
});
