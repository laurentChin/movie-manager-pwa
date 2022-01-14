import { gql } from "@apollo/client";

export const VALIDATE_TOKEN = gql`
  mutation ValidateToken($token: String) {
    validateToken(token: $token) {
      email
    }
  }
`;
