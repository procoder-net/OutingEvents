const express = require("express");
require("dotenv").config({ path: "../variables.env" });
const bodyParser = require("body-parser");

// Bring in graphql express middleware
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Initialize application
const app = express();
server.applyMiddleware({ app });
const PORT = process.env.PORT || 3000;

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
