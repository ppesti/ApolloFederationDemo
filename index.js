require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
// const { buildFederatedSchema } = require('@apollo/federation');

const gateway = new ApolloGateway();

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    // schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});
