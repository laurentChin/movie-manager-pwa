import gql from "graphql-tag";

const FETCH_USER = gql`
  query FetchUser($email: String) {
    getUser(email: $email) {
      count
      lastLogin
    }
  }
`;

export default { FETCH_USER };
