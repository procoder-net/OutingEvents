exports.typeDefs = `
type User {
    username: String!
    password: String!
    email: String!
    joinedDate: String
    favorites: [String],  
}

type Event{
    name: String!
    eventType: String!
    description: String
    eventDate: String!
    location: String!
    invited: [String]
    acceptedInvite: [String]
    organizer: [String]
}

type SurveyQuestion{
    id: Int
    name: String
    event_id: Int
    questions: String
}

type EventParticipant{
    id: Int
    event_id: Int
    user_id: Int
    is_organizer: Boolean
    notified: Boolean
    confirmed: Boolean
    attended: Boolean
    tooksurvey: Boolean
}

type Receipt{
    id: Int
    event_id: Int
    vendor: String
    description: String
    amount: Int
    currency: String
}

type Payment{
    id: Int
    event_id: Int
    user_id: Int
    status: String
    description: String
    amount: Int
    currency: String
}

type SurveyResult{
    id: Int
    survey_question_id: Int
    event_id: Int
    response: String
}

type Query {
    getAllEvents: [Event]
    getAllSurveyQuestions(event_id: Int): [SurveyQuestion]
    getAllEventParticipants(event_id: Int): [EventParticipant]
    getReceiptByEvent(event_id: Int): [Receipt]
    getPaymentByEvent(event_id: Int): [Payment]
    getSurveyResponsesByQuestionId(survey_question_id: Int): [SurveyResult]
}

type Mutation {
    addEvent(name: String!, eventType: String!, description: String, eventDate: String!,
        location: String!, invited: [String]): Event
    sendSurveyEmail(eventId: String!, eventName: String!, surveyId: String!, emailList:[String!]): String
    addSurveyQuestion(id: Int, name: String, event_id: Int, questions: String):SurveyQuestion
    deleteSurveyQuestion(id: Int): SurveyQuestion
    addEventParticipant(event_id: Int, user_id: Int, is_organizer: Boolean): EventParticipant
    removeEventParticipant(id: Int): EventParticipant
    updateEventParticipant(id: Int, is_organizer: Boolean, notified: Boolean, confirmed: Boolean, attended: Boolean, tooksurvey: Boolean): EventParticipant
    addReceipt(event_id: Int, vendor: String, description: String, amount: Int, currency: String): Receipt
    deleteReceipt(id: Int): Receipt
    createPayment(event_id: Int, user_id: Int, payment_status: String, amount: Int, currency: String, description: String): Payment
    updatePaymentStatus(id: Int, new_status: String): Payment
    createSurveyResponse(survey_question_id: Int, event_id: Int, user_id: Int,response:String): SurveyResult
}
`;
