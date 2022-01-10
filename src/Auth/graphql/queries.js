import { gql } from "@apollo/client";

const LOG_IN = gql`
  query Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      jwt
    }
  }
`;

export default {
  LOG_IN,
};
