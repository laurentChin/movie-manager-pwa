import gql from "graphql-tag";

const SIGN_IN = gql`
  mutation SignIn($email: String, $password: String) {
    addUser(email: $email, password: $password) {
      email
    }
  }
`;

export default {
  SIGN_IN
};
