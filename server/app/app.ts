import "reflect-metadata";
const express = require("express");
require("dotenv").config({ path: "variables.env" });
/*<<<<<<< HEAD
var pg = require("pg");
const client = new pg.Client();
const cors = require("cors");
// Bring in graphql express middleware
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const bodyParser = require("body-parser");

//const { Event } = require("./entity/Event");
import Event from "./entity/Event";

import { createConnection, ConnectionOptions } from "typeorm";
import SurveyQuestion from "./entity/SurveyQuestion";
import SurveyResult from "./entity/SurveyResult";

const ormConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Event, SurveyQuestion, SurveyResult],
  synchronize: true,
  logging: false
};
console.log(JSON.stringify(ormConfig, null, 4));
=======*/
const bodyParser = require("body-parser");
const cors = require("cors");
import connectORM from "./connection";

const app = express();
const corsOptions = {
  origin: "http://localhost:1234",
  credentials: true
};
app.use(cors());
connectORM
  .connect()
  .then(async connection => {
    // All Routes will be configured in routes folder including graphql
    console.log("successful connection");
    server.applyMiddleware({ app, path: "/api/" });
    require("./routes")(app);
  })
  .catch(error => console.log(error));
