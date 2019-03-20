import express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
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

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
