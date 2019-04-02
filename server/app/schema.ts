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
    event: Event
    useremail: String!
    is_organizer: Boolean
    confirmed: Boolean
    attended: Boolean
    payments: [Payment]
    survey_results: [SurveyResult]
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
    questions: String
    type: String
    description: String
    event_date: String
    deadline_date: String
    location: String
    surveyId: Int
    receipt: [Receipt]
    event_participants: [EventParticipant]
    survey_result:[SurveyResult]
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
    user: String
    questions: String
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
    event_participant: EventParticipant
    status: String
    description: String
    amount: Int
    currency: String
}

input SurveyResultInput{
    surveyquestion: String!
    eventId: Int!
    surveyId: Int!
    participantId: Int!
    useremail: String!
    response: String!
}

type SurveyResult{
    useremail: String!
    id: Int
    survey_question: SurveyQuestion
    event: Event
    event_participant: EventParticipant
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
    event(eventId: Int): Event
    eventParticipants(eventId: Int): [EventParticipant]
    allSurvey: [SurveyQuestion]
    survey(surveyId: Int): SurveyQuestion
    surveyResults(eventId: Int): [SurveyResult]
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
    createSurveyResponse(survey: SurveyResultInput): SurveyResult
    createUserProfile(first_name: String, last_name: String, email: String, username: String, password: String): User
}
`;
