import "reflect-metadata";
const express = require("express");
require("dotenv").config({ path: "variables.env" });
import Event from "./entity/Event";
const cron = require("node-cron");
const bodyParser = require("body-parser");
const cors = require("cors");
import connectORM from "./connection";
import { CheckforEventDeadline } from "./service/cronService";

const app = express();
const corsOptions = {
  origin: "http://localhost:1234",
  credentials: true
};
app.use(cors());

cron.schedule("* * * * *", function() {
  CheckforEventDeadline();
});

connectORM
  .connect()
  .then(async connection => {
    // All Routes will be configured in routes folder including graphql
    require("./routes")(app);
  })
  .catch(error => console.log(error));
