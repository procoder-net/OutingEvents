"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var graphqlHTTP = require('express-graphql');
var buildSchema = require('graphql').buildSchema;
// Create a new express application instance
var app = express();
// Construct a schema, using GraphQL schema language
var schema = buildSchema("\n  type Query {\n    hello: String\n  }\n");
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return 'Hello world!';
    },
};
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
