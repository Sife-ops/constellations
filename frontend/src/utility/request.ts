import gql from "graphql-tag";

export const login = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
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
  query User($userId: Int!) {
    user(id: $userId) {
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
