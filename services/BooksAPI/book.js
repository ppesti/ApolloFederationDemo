const { buildFederatedSchema } = require("@apollo/federation");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./typeDefs.js");
const resolvers = require("./resolvers.js");

const server = new ApolloServer({
  // build the schema from the union of the 2 book apis
  // not applicable fields will be represented with null values
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4008 }, () => {
  console.log(`Server ready at http://localhost:4008${server.graphqlPath}`);
});
