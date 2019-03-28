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

type Query {
    getAllEvents: [Event]
    getAllSurveyQuestions(event_id: Int): [SurveyQuestion]
}

type Mutation {
    addEvent(name: String!, eventType: String!, description: String, eventDate: String!,
        location: String!, invited: [String]): Event
    sendSurveyEmail(eventId: String!, eventName: String!, surveyId: String!, emailList:[String!]): String
    addSurveyQuestion(id: Int, name: String, event_id: Int, questions: String):SurveyQuestion
    deleteSurveyQuestion(id: Int): SurveyQuestion
}
`;
