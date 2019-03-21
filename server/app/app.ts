const express = require("express");
require("dotenv").config({ path: "../variables.env" });
const bodyParser = require("body-parser");
var pg = require('pg');
var client = new pg.Client();

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

app.get('/api', (req, res) => {
    client.connect()
        .then(() => {
            const query:string = 'SELECT * FROM example_table;'
            const params:string[] = [];
            return client.query(query, params);
        })
        .then((data:any) => {
            res.send(data);
        })
        .catch((err:any) => {
            console.log(err);
        })
});

app.post('/api', (req, res) => {
    client.connect()
        .then(() => {
            const query:string = "INSERT INTO example_table VALUES('person2');";
            const params:string[] = [];
            return client.query(query, params);
        })
        .then((data:any) => {
            res.send(data);
        })
        .catch((err:any) => {
            console.log(err);
        })
});

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
