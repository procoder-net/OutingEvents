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

type Query {
    getAllEvents: [Event]
}

type Mutation {
    addEvent(name: String!, eventType: String!, description: String, eventDate: String!,
        location: String!, invited: [String]): Event
}
`;
