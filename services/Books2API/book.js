const { buildFederatedSchema } = require("@apollo/federation");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./typeDefs.js");
const resolvers = require("./resolvers.js");

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4007 }, () => {
  console.log(`Server ready at http://localhost:4007${server.graphqlPath}`);
});
