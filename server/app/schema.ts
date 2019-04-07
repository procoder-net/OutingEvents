exports.typeDefs = `

input DateInput {
    month: Int!
    day: Int!
    year: Int!
    hour: Int!
    minute: Int!
}

type EventParticipant{
    id: Int!
    user: String!
    is_organizer: Boolean
    confirmed: Boolean
    attended: Boolean
    event: Event,
    payment: Payment,
    surveyResult: SurveyResult
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
    event_date: String
    deadline_date: String
    location: String
    image: String
    survey: [SurveyQuestion]
    event_participants: [EventParticipant]
    survey_result:[SurveyResult]
    receipts: [Receipt]
    payments: [Payment]
}

input EventInput{
    name: String!
    type: String!
    description: String
    eventDateTime: DateInput!
    deadlineDatetime: DateInput!,
    survey: Int!
    location: String!
    invited: [String]
    image: String
    organizer: [String]
}

input SurveyQuestionInput{
    user: String
    questions: String!
    formattedquestions: String
}

type SurveyQuestion{
    id: Int
    user: String
    questions: String!
    formattedquestions: String
}

type Receipt{
    id: Int
    event: Event
    vendor: String
    description: String
    amount: Int
    currency: String
}

type Payment{
    id: Int
    user: String
    status: String
    description: String
    amount: Int
    currency: String
    event_id: Int
}

input PaymentInput{
    participant_id: Int
    user: String
    status: String
    description: String
    amount: Int
    currency: String
    event_id: Int
}

input SurveyResultInput{
    event_id: Int!
    survey_id: Int!
    participant_id: Int!
    user: String!
    surveyquestion: String!
    response: String!
}

type SurveyResult{
    id: Int
    user: String!
    survey_id: SurveyQuestion
    event_id: Event
    event_participants: EventParticipant
    response: String
}

type User{
    id: Int
    first_name: String
    last_name: String
    email: String
    username: String
    password: String
    participated_events: [Event]
}

type Query {
    allEvents: [Event]
    allEventsByUser(user: String!): [Event]
    event(eventId: Int!): Event
    eventParticipants(eventId: Int!): [EventParticipant]
    eventParticipantsByUser(user: String!): [EventParticipant]
    allSurvey: [SurveyQuestion]
    survey(surveyId: Int!): SurveyQuestion
    surveyResults(eventId: Int!, participant_id: Int): [SurveyResult]
    payments(eventId: Int): [Payment]
    receipt(eventId: Int): [Receipt]
    getAllEvents: [Event]
    getEventByEventId(event_id: Int): Event
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
    addSurvey(question: SurveyQuestionInput): SurveyQuestion
    addSurveyResult(survey: SurveyResultInput): SurveyResult
    updateEventNameByEventId( id: Int, name: String!) : Event
    deleteEventById(id: Int):Event
    sendSurveyEmail(eventId: String!, eventName: String!, surveyId: String!, emailList:[String!]): String   
    addSurveyQuestion(name: String, question: String, formattedquestion: String):SurveyQuestion
    deleteSurveyQuestion(id: Int): SurveyQuestion
    addEventParticipant(participant: EventParticipantInput): EventParticipant
    removeEventParticipant(id: Int): EventParticipant
    updateEventParticipant(id: Int, is_organizer: Boolean, notified: Boolean, confirmed: Boolean, attended: Boolean, tooksurvey: Boolean): EventParticipant
    addReceipt(event_id: Int, vendor: String, description: String, amount: Int, currency: String): Receipt
    deleteReceipt(id: Int): Receipt
    createPayment(event_id: Int, user_id: Int, payment_status: String, amount: Int, currency: String, description: String): Payment
    updatePaymentStatus(id: Int, new_status: String): Payment
    createUserProfile(first_name: String, last_name: String, email: String, username: String, password: String): User
    createPaymentEntry(payments: [PaymentInput]): [Payment]
}
`;
