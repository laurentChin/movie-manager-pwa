import { gql } from "@apollo/client";

const FETCH_USER = gql`
  query FetchUser($email: String) {
    getUser(email: $email) {
      count
      lastLogin
    }
  }
`;

export default { FETCH_USER };
