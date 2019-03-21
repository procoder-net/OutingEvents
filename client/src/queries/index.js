import { gql } from "apollo-boost";

export const GET_ALL_EVENTS = gql`
  query {
    getAllEvents {
      name
      description
    }
  }
`;
