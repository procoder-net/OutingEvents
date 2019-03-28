import "reflect-metadata";
const express = require("express");
require("dotenv").config({ path: "variables.env" });
import Event from "./entity/Event";

const bodyParser = require("body-parser");
const cors = require("cors");
import connectORM from "./connection";
import { getConnection, createConnection, ConnectionOptions } from "typeorm";

const app = express();
const corsOptions = {
  origin: "http://localhost:1234",
  credentials: true
};
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
app.use(cors());
connectORM
  .connect()
  .then(async connection => {
    // All Routes will be configured in routes folder including graphql
    require("./routes")(app);
  })
  .catch(error => console.log(error));
