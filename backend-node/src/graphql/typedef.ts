import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type User {
    id: Int
    email: String
    username: String
    cars: [Car!]
  }

  type Car {
    id: Int
    year: Int
    plate: String
    user: User
  }

  type Query {
    hello: String
    authTest: String
    user: User
    users: [User]
    cars: [Car]
  }
`;
