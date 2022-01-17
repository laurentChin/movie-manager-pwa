import { gql } from "@apollo/client";

export const LOG_IN = gql`
  query Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      jwt
    }
  }
`;
