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

type Query {
    getAllEvents: [Event]
    getAllSurveyQuestions(event_id: Int): [SurveyQuestion]
    getAllEventParticipants(event_id: Int): [EventParticipant]
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
}
`;
