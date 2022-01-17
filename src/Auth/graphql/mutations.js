import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String, $password: String) {
    addUser(email: $email, password: $password) {
      email
    }
  }
`;

export const VALIDATE_TOKEN = gql`
  mutation ValidateToken($token: String) {
    validateToken(token: $token) {
      email
    }
  }
`;
