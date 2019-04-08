const nodemailer = require("nodemailer");
const surveyEmail = require("./email/sendSurvey");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendSurveyEmail = async (
  eventId: String,
  eventName: String,
  surveyId: String,
  emailList: [String],
  host: String
) => {
  const surveyHost = host + "/survey/" + eventId;
  const options = {
    cc: emailList,
    from: "admin@orgo.com",
    subject: `Event Name ${eventName}`,
    html: surveyEmail(eventName, "Moyeen", surveyHost)
  };
  await transport
    .sendMail(options)
    .then(() => "done")
    .catch((err: any) => {
      console.log(err);
    });
  return "done";
};

exports.transport = transport;
exports.sendSurveyEmail = sendSurveyEmail;
