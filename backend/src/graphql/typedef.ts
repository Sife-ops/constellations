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
    login(email: String, password: String): User
    register(email: String, username: String, password: String): User
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
