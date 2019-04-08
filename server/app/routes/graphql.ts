// Bring in graphql express middleware
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("../schema");
const { resolvers } = require("../resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => ({
    req
  })
});

export default server;
