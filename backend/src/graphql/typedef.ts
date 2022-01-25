import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Car {
    id: Int
    year: Int
    plate: String
    user: User
  }

  type User {
    id: Int
    email: String
    username: String
    cars: [Car!]
  }

  type Mutation {
    userExists(email: String, username: String): Boolean
  }

  type Query {
    authTest: String
    cars: [Car]
    hello: String
    user: User
    users: [User]
  }
`;
