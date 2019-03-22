var express = require("express");
require("dotenv").config({ path: "../variables.env" });
var bodyParser = require("body-parser");
var pg = require("pg");
var client = new pg.Client();
// Bring in graphql express middleware
var ApolloServer = require("apollo-server-express").ApolloServer;
var typeDefs = require("./schema").typeDefs;
var resolvers = require("./resolvers").resolvers;
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
// Initialize application
var app = express();
server.applyMiddleware({ app: app });
var PORT = process.env.PORT || 3000;
server.applyMiddleware({ app: app });
app.get("/api", function(req, res) {
  client
    .connect()
    .then(function() {
      var query = "SELECT * FROM example_table;";
      var params = [];
      return client.query(query, params);
    })
    .then(function(data) {
      res.send(data);
    })
    ["catch"](function(err) {
      console.log(err);
    });
});
app.post("/api", function(req, res) {
  client
    .connect()
    .then(function() {
      var query = "INSERT INTO example_table VALUES('person2');";
      var params = [];
      return client.query(query, params);
    })
    .then(function(data) {
      res.send(data);
    })
    ["catch"](function(err) {
      console.log(err);
    });
});
app.listen({ port: PORT }, function() {
  return console.log(
    "\uD83D\uDE80 Server ready at http://localhost:" + PORT + server.graphqlPath
  );
});
