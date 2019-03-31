exports.typeDefs = `

input DateInput {
    month: Int!
    day: Int!
    year: Int!
    hour: Int!
    minute: Int!
}

type EventParticipant{
    id: Int
    event_id: Event
    useremail: String!
    is_organizer: Boolean
    confirmed: Boolean
    attended: Boolean
}

input EventParticipantInput{
    event_id: String!
    useremail: String!
    is_organizer: Boolean!
    confirmed: Boolean
    attended: Boolean
}

type Event{
    id: Int
    name: String
    type: String
    description: String
    eventDate: String
    deadlineDate: String
    location: String
    invites: [EventParticipant]
    organizer: [String]
}

input EventInput{
    name: String!
    type: String!
    description: String
    eventDateTime: DateInput!
    deadlineDatetime: DateInput!,
    surveyId: Int!
    location: String!
    invited: [String]
    organizer: [String]
}

type SurveyQuestion{
    id: Int
    name: String
    event_id: Int
    questions: String
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

type User{
    first_name: String
    last_name: String
    email: String
    username: String
    password: String
}

type Query {
    getAllEvents: [Event]
    getEventByEventId(event_id: Int): [Event]
    getAllSurveyQuestions(event_id: Int): [SurveyQuestion]
    getAllEventParticipants(event_id: Int): [EventParticipant]
    getReceiptByEvent(event_id: Int): [Receipt]
    getPaymentByEvent(event_id: Int): [Payment]
    getSurveyResponsesByQuestionId(survey_question_id: Int): [SurveyResult]
    getAllUserProfiles: [User]
    getUserProfile(id: Int): User
}

type Mutation {
    addEvent(event: EventInput) : Event
    updateEventNameByEventId( id: Int, name: String!) : Event
    deleteEventById(id: Int):Event
    sendSurveyEmail(eventId: String!, eventName: String!, surveyId: String!, emailList:[String!]): String   
    addSurveyQuestion(id: Int, name: String, event_id: Int, questions: String):SurveyQuestion
    deleteSurveyQuestion(id: Int): SurveyQuestion
    addEventParticipant(participant: EventParticipantInput): EventParticipant
    removeEventParticipant(id: Int): EventParticipant
    updateEventParticipant(id: Int, is_organizer: Boolean, notified: Boolean, confirmed: Boolean, attended: Boolean, tooksurvey: Boolean): EventParticipant
    addReceipt(event_id: Int, vendor: String, description: String, amount: Int, currency: String): Receipt
    deleteReceipt(id: Int): Receipt
    createPayment(event_id: Int, user_id: Int, payment_status: String, amount: Int, currency: String, description: String): Payment
    updatePaymentStatus(id: Int, new_status: String): Payment
    createSurveyResponse(survey_question_id: Int, event_id: Int, user_id: Int,response:String): SurveyResult
    createUserProfile(first_name: String, last_name: String, email: String, username: String, password: String): User
}
`;
