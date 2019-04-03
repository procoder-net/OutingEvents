import { Router, Request, Response } from "express";
import connectORM from "../connection";
import authorize from "../OktaJwt";
const router: Router = Router();
import Event from "../entity/Event";
import * as surveyQuestionService from "./../service/surveyQuestionService";

router.get("/api/event", authorize, (req: Request, res: Response) => {
  connectORM
    .getRepository(Event)
    .find()
    .then((events: any) => {
      res.status(200).send(events);
    })
    .catch((err: any) => {
      console.log("@catch");
      res.status(500).send(err);
    });
});

router.get("/api/event/:event_name", (req: Request, res: Response) => {
  connectORM
    .getRepository(Event)
    .find({ name: req.params.event_name })
    .then((events: any) => {
      res.status(200);
      res.send(events);
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
});

router.post("/api/event", (req: any, res: any) => {
  const event = new Event();
  event.name = "April fools";
  event.type = "Jokes";
  event.location = "Planet earth";
  event.state = "Draft";
  event.event_date = new Date(2019, 3, 1, 0, 0, 0, 0);
  event.deadline_date = new Date(2019, 3, 2, 0, 0, 0, 0);
  connectORM
    .getManager()
    .save(event)
    .then((result: any) => {
      res.status(202);
      res.send(result);
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
      console.log(JSON.stringify(err, null, 4));
    });
});

router.post("/api/event/:eventId/surveyQuestion", (req: any, res: any) => {
  console.log("post");
  surveyQuestionService
    .createSurveyQuestion("aaa", "aaa", "aaa")
    .then((result: any) => {
      res.status(202);
      res.send(result);
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
      console.log(JSON.stringify(err, null, 4));
    });
});

router.get("/api/event/:eventId/surveyQuestion", (req: any, res: any) => {
  surveyQuestionService
    .getSurveyQuestionsBySurveyId(req.params.eventId)
    .then((surveyQuestions: any) => {
      res.status(200);
      res.send(surveyQuestions);
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
});

router.delete(
  "/api/event/:eventId/surveyQuestion/:questionId",
  (req: any, res: any) => {
    surveyQuestionService
      .deleteSurveyQuestion(req.params.questionId)
      .then((result: any) => {
        res.status(202);
        res.send(result);
      })
      .catch((err: any) => {
        res.status(500);
        res.send(err);
        console.log(JSON.stringify(err, null, 4));
      });
  }
);

module.exports = router;
