import gql from "graphql-tag";

export const login = gql`
  mutation Login($email: String, $password: String, $remember: Boolean) {
    login(email: $email, password: $password, remember: $remember) {
      id
      email
      username
    }
  }
`;

export const register = gql`
  mutation Register($password: String!, $username: String!, $email: String!) {
    register(password: $password, username: $username, email: $email) {
      email
      username
    }
  }
`;

export const user = gql`
  query User {
    user {
      id
      email
      username
    }
  }
`;

export const userExists = gql`
  mutation UserExists($email: String, $username: String) {
    userExists(email: $email, username: $username)
  }
`;

export const authTest = gql`
  query AuthTest {
    authTest
  }
`;
