import SurveyQuestion from "../entity/SurveyQuestion";
import SurveyResult from "../entity/SurveyResult";
import connectORM from "./../connection";
import { default as Event } from "../entity/Event";
import { getEventByEventId } from "./eventService";
import { getEventParticipants } from "./eventParticipantService";
import EventParticipant from "../entity/EventParticipant";

export async function createSurveyQuestion(
  user: string,
  formattedquestion: any,
  questions: any
) {
  const surveyQuestion = new SurveyQuestion();
  surveyQuestion.user = user;
  if (formattedquestion !== "null") {
    surveyQuestion.formattedquestion = formattedquestion;
  }
  surveyQuestion.questions = questions;
  let surveyq = await connectORM
    .getRepository(SurveyQuestion)
    .save(surveyQuestion);
  return surveyq;
}

export async function updateSurveyQuestionbyId(
  id: any,
  formattedquestion: any
) {
  await connectORM
    .getRepository(SurveyQuestion)
    .findOne({ id: id })
    .then((surveyq: any) => {
      if (!surveyq.formattedquestion) {
        surveyq.formattedquestion = formattedquestion;
        return connectORM.getRepository(SurveyQuestion).save(surveyq);
      }
      return true;
    });
}

export function deleteSurveyQuestion(questionId: number) {
  return connectORM
    .getRepository(SurveyQuestion)
    .delete(questionId)
    .then((result: any) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

export function getAllSurveyQuestions() {
  return connectORM
    .getRepository(SurveyQuestion)
    .find()
    .then((surveyQuestions: any) => {
      let surveyq = surveyQuestions.map((sq: SurveyQuestion) => {
        sq.questions = JSON.stringify(sq.questions);
        sq.formattedquestion = JSON.stringify(sq.formattedquestion);
        return sq;
      });
      console.log(surveyq);
      return surveyq;
    })
    .catch(err => {
      throw err;
    });
}
export function getSurveyQuestionsBySurveyId(surveyId?: number) {
  let find: any = surveyId
    ? {
        where: {
          id: surveyId
        }
      }
    : {};
  return connectORM
    .getRepository(SurveyQuestion)
    .find(find)
    .then((surveyQuestions: any) => {
      let surveyq = surveyQuestions.map((sq: SurveyQuestion) => {
        sq.questions = JSON.stringify(sq.questions);
        sq.formattedquestion = JSON.stringify(sq.formattedquestion);
        return sq;
      });
      return surveyq;
    })
    .catch(err => {
      throw err;
    });
}

export async function getSurveyQuestionsByEventId(eventId: number) {
  let events: any = await getEventByEventId(eventId);
  return [events[0].survey];
}

export async function createSurveyResult(
  eventId: any,
  surveyId: number,
  user: string,
  participantId: number,
  result: any
) {
  const surveyResult = new SurveyResult();
  surveyResult.user = user;
  surveyResult.event = await getEventByEventId(eventId, false);
  surveyResult.event_participant = await getEventParticipants(
    eventId,
    participantId
  );
  surveyResult.response = result;
  surveyResult.survey_question = surveyId;

  let surveyResultResp = await connectORM
    .getRepository(SurveyResult)
    .save(surveyResult)
    .catch(err => {
      throw err;
    });
  return surveyResultResp;
}

const populateSurveyResults = ["event_participant", "event"];
export function getSurveyResultsByEvent(
  event_id: number,
  partipant_id?: number,
  populateRelations = true
) {
  let find: any = {
    where: {
      event_id: event_id
    }
  };
  if (partipant_id) {
    find.where.participant_id = partipant_id;
  }
  if (populateRelations) {
    find.relations = populateSurveyResults;
  }
  return connectORM
    .getRepository(SurveyResult)
    .find(find)
    .then((surveyResults: any) => {
      return surveyResults.map((sr: SurveyResult) => {
        sr.response = JSON.stringify(sr.response);
        return sr;
      });
    })
    .catch(err => {
      throw err;
    });
}

export function getCountedSurveyResultsByEvent(event_id: number) {
  var surveyRecord: any;

  class Question {
    question: string;
    answers: string[] = [];
    counts: number[] = [];
  }

  class newFormQuestion {
    question: string;
    answers: any[] = [];
  }

  return connectORM
    .getRepository(SurveyResult)
    .find({ event: event_id })
    .then(eventSurveyResults => {
      var surveyNo: number = 0;
      var questionNo: number = 0;
      var questionKeys: string[];
      var answerValues: string[];
      var questions: Question[] = [];
      var countarray: number[] = [];
      var firstpass: number = 0;
      var answerIndex: number;
      var newQuestion: boolean;
      for (let surveyRecord_i of eventSurveyResults) {
        //console.log("SurveyResult : " + surveyNo);
        surveyRecord = surveyRecord_i;
        questionKeys = Object.keys(surveyRecord.response);
        Object.keys(surveyRecord.response).forEach(key => {
          answerValues = surveyRecord.response[key];
          //console.log(questionKeys[questionNo]);
          //console.log(answerValues);
          if (firstpass == 0) {
            let question_i = new Question();
            question_i.question = questionKeys[questionNo];
            question_i.answers = answerValues;
            for (let answer_j in answerValues) {
              countarray.push(1);
            }
            question_i.counts = countarray;
            countarray = [];
            questions.push(question_i);
          } else {
            newQuestion = true;
            for (let j in questions) {
              let question_j = new Question();
              question_j = questions[j];
              if (questionKeys[questionNo] == question_j.question) {
                for (let answer of answerValues) {
                  console.log(answer);
                  answerIndex = question_j.answers.indexOf(answer);
                  if (answerIndex > -1) {
                    question_j.counts[answerIndex] += 1;
                    questions[j].counts = question_j.counts;
                  } else {
                    question_j.answers.push(answer);
                    question_j.counts.push(1);
                    questions[j].answers = question_j.answers;
                    questions[j].counts = question_j.counts;
                  }
                }
                newQuestion = false;
                break;
              }
            }
            if (newQuestion) {
              let question_j = new Question();
              question_j.question = questionKeys[questionNo];
              question_j.answers = answerValues;
              for (let answer_k in answerValues) {
                countarray.push(1);
              }
              question_j.counts = countarray;
              countarray = [];
              questions.push(question_j);
            }
          }

          questionNo += 1;
        });

        questionNo = 0;
        surveyNo += 1;
        firstpass = 1;
      }

      //console.log("here are the question counts");
      //console.log(questions);

      // Change the return format

      var newFormuestions: newFormQuestion[] = [];

      for (let i in questions) {
        let question_i = new newFormQuestion();
        question_i.question = questions[i].question;
        for (let answer_j in questions[i].answers) {
          question_i.answers.push({
            answer: questions[i].answers[answer_j],
            count: questions[i].counts[answer_j]
          });
        }
        newFormuestions.push(question_i);
      }

      console.log(newFormuestions);

      return newFormuestions;
    })
    .catch(err => {
      console.log("No results found for event: " + event_id);
      throw err;
    });
}

// tested get and add
// need to test update and delete
