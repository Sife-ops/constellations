import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Bookmark {
    id: Int
    url: String
    description: String
    categories: [Category]
    user: User
  }

  type Category {
    id: Int
    name: String
    bookmarks: [Bookmark]
    user: User
  }

  type User {
    id: Int
    email: String
    username: String
    bookmarks: [Bookmark]
    categories: [Category]
  }

  type Query {
    _dev0: String
    _dev1: [User]
    _dev2: User
    _dev3(id: Int): User
    categories: [Category]
  }

  type Mutation {
    login(email: String, password: String, remember: Boolean): User
    register(email: String, username: String, password: String): User
    userExists(email: String, username: String): Boolean
  }
`;
