import express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var pg = require('pg');
var client = new pg.Client();

// Create a new express application instance
const app: express.Application = express();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

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

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
