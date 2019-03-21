"use strict";
exports.__esModule = true;
var express = require("express");
var graphqlHTTP = require('express-graphql');
var buildSchema = require('graphql').buildSchema;
var pg = require('pg');
var client = new pg.Client();
client.connect();
// Create a new express application instance
var app = express();
// Construct a schema, using GraphQL schema language
var schema = buildSchema("\n  type Query {\n    hello: String\n  }\n");
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return 'Hello world!';
    }
};
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.get('/api', function (req, res) {
    console.log(JSON.stringify(client, null, 4));
    client.query({ name: 'example', text: 'SELECT * FROM dummy_table' }, function (err, res) {
        if (err) {
            res.send(err.stack);
        }
        else {
            res.send(res);
        }
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
