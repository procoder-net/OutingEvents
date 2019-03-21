"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var graphqlHTTP = require('express-graphql');
var buildSchema = require('graphql').buildSchema;
var pg = require('pg');
var client = new pg.Client();
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
app.get('/api', function (req, res) {
    client.connect()
        .then(function () {
        var query = 'SELECT * FROM example_table;';
        var params = [];
        return client.query(query, params);
    })
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        console.log(err);
    });
});
app.post('/api', function (req, res) {
    client.connect()
        .then(function () {
        var query = "INSERT INTO example_table VALUES('person2');";
        var params = [];
        return client.query(query, params);
    })
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        console.log(err);
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
