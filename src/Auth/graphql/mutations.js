import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String, $password: String) {
    addUser(email: $email, password: $password) {
      email
    }
  }
`;
