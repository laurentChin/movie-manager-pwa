import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignIn($email: String, $password: String) {
    addUser(email: $email, password: $password) {
      email
    }
  }
`;

const VALIDATE_TOKEN = gql`
  mutation ValidateToken($token: String) {
    validateToken(token: $token) {
      email
    }
  }
`;

export default {
  SIGN_IN,
  VALIDATE_TOKEN,
};
