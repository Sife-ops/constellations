import { gql } from 'apollo-server-core';

// todo: official test endpoint
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

  type LoginResponse {
    accessToken: String!
  }

  type User {
    id: Int
    username: String
    bookmarks: [Bookmark]
    categories: [Category]
  }

  type Query {
    bookmarks: [Bookmark]
    categories: [Category]
    user: User
  }

  type Mutation {
    bookmarkAdd(
      description: String!
      url: String!
      categoryIds: [Int]
    ): Bookmark
    bookmarkDelete(id: Int!): Bookmark
    bookmarkUpdate(
      id: Int!
      description: String
      url: String
      categoryIds: [Int]
    ): Bookmark
    categoryAdd(name: String!): Category
    categoryDelete(id: Int!): Category
    categoryUpdate(id: Int!, name: String!): Category
    login(username: String!, password: String!, remember: Boolean): LoginResponse
    pageTitle(url: String!): String
    register(username: String!, password: String!, captcha: String): User
    userExists(email: String, username: String): Boolean
  }
`;
