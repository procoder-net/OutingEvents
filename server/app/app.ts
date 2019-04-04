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
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
connectORM
  .connect()
  .then(async connection => {
    // All Routes will be configured in routes folder including graphql
    require("./routes")(app);
  })
  .catch(error => console.log(error));
