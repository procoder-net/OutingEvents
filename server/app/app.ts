const express = require("express");
require("dotenv").config({ path: "../variables.env" });
const bodyParser = require("body-parser");
const cors = require("cors");
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

const corsOptions = {
  origin: "http://localhost:1234",
  credentials: true
};
app.use(cors());
server.applyMiddleware({ app });
const PORT = process.env.PORT || 3000;

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
