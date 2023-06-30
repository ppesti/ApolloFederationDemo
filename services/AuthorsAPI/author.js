const { gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");

// TODO: fetch data from db
const authors = [
  { id: "a1", name: "Harper Lee" },
  { id: "a2", name: "George Orwell" },
  { id: "a3", name: "Jane Austen" },
  { id: "a4", name: "F. Scott Fitzgerald" },
  { id: "a5", name: "J.R.R. Tolkien" },
];

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

const resolvers = {
  Query: {
    authors: () => {
      return authors;
    },
    author: (_, args) => {
      return authors.find((b) => b.id === args.id);
    },
  },
  Book: {
    author: (parent) => authors.find((b) => b.id == parent.authorId),
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4004 }, () => {
  console.log(`Server ready at http://localhost:4003${server.graphqlPath}`);
});
