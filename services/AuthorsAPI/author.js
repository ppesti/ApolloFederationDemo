const { buildFederatedSchema } = require("@apollo/federation");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./typeDefs.js");
const resolvers = require("./resolvers.js");

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

const app = express();

// parse JSON body
app.use(express.json()); 
// log request to the console
app.use((req, res, next) => {
  console.log(req.headers, req.body);
  next();
});

server.applyMiddleware({ app });

app.listen({ port: 4004 }, () => {
  console.log(`Server ready at http://localhost:4004${server.graphqlPath}`);
});
