import { gql } from "@apollo/client";

export const FETCH_USER = gql`
  query FetchUser($email: String) {
    getUser(email: $email) {
      count
      lastLogin
    }
  }
`;
