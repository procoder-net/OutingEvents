import "reflect-metadata";
const express = require("express");
require("dotenv").config({ path: "variables.env" });
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
    app.use(bodyParser.json());
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

    app.post("/api/event/:eventId/surveyQuestion", (req: any, res: any) => {
      const body = req.params;
      const surveyQuestion = new SurveyQuestion();
      surveyQuestion.event_id = req.params.eventId;
      console.log(req.body);
      surveyQuestion.name = req.body.name;
      surveyQuestion.questions = JSON.stringify({
        question: req.body.name,
        options: req.body.options
      });
      connection.manager
        .save(surveyQuestion)
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

    app.get("/api/event/:eventId/surveyQuestion", (req: any, res: any) => {
      connection.manager
        .getRepository(SurveyQuestion)
        .find({ event_id: req.params.eventId })
        .then(surveyQuestions => {
          surveyQuestions.forEach(function(obj) {
            let questionString: string = obj.questions;
            console.log(obj);
            obj.questions = JSON.parse(questionString);
          });
          res.status(200);
          res.send(surveyQuestions);
        })
        .catch(err => {
          res.status(500);
          res.send(err);
        });
    });

    app.delete(
      "/api/event/:eventId/surveyQuestion/:questionId",
      (req: any, res: any) => {
        connection.manager
          .getRepository(SurveyQuestion)
          .delete(req.params.questionId)
          .then(surveyQuestion => {
            res.status(200);
            res.send({
              status: "success",
              id: req.params.questionId,
              event_id: req.params.eventId
            });
          })
          .catch(err => {
            res.status(500);
            res.send(err);
          });
      }
    );

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  })
  .catch(error => console.log(error));
