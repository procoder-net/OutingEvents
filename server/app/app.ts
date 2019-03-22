import "reflect-metadata";
const express = require("express");
require("dotenv").config({ path: "../variables.env" });
const bodyParser = require("body-parser");
var pg = require("pg");
const client = new pg.Client();
const cors = require("cors");
// Bring in graphql express middleware
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
//const { Event } = require("./entity/Event");
import Event from "./entity/Event";

import { createConnection, ConnectionOptions } from "typeorm";

const ormConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Event],
  synchronize: true,
  logging: false
};
console.log(JSON.stringify(ormConfig, null, 4));

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const corsOptions = {
  origin: "http://localhost:1234",
  credentials: true
};

createConnection(ormConfig)
  .then(async connection => {
    app.use(cors());
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 3000;
    server.applyMiddleware({ app });

    app.get("/event", (req: any, res: any) => {
      connection.manager
        .getRepository(Event)
        .find()
        .then(events => {
          res.status(200);
          res.send(events);
        })
        .catch(err => {
          res.status(500);
          res.send(err);
        });
    });

    app.get("/event/:event_name", (req: any, res: any) => {
      connection.manager
        .getRepository(Event)
        .find({ name: req.params.event_name })
        .then(events => {
          res.status(200);
          res.send(events);
        })
        .catch(err => {
          res.status(500);
          res.send(err);
        });
    });

    app.post("/event", (req: any, res: any) => {
      const event = new Event();
      event.name = "April fools";
      event.type = "Jokes";
      event.location = "Planet earth";
      event.state = "planning";
      event.survey_id = 367;
      event.start_time = new Date(2019, 3, 1, 0, 0, 0, 0);
      event.end_time = new Date(2019, 3, 2, 0, 0, 0, 0);
      connection.manager
        .save(event)
        .then((result: any) => {
          res.status(202);
          res.send(result);
        })
        .catch(err => {
          res.status(500);
          res.send(err);
          console.log(JSON.stringify(err, null, 4));
        });
    });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  })
  .catch(error => console.log(error));
