import { gql } from "@apollo/client";

export const LOGS = gql`
  query FetchLogs($createdAt: String) {
    logs(createdAt: $createdAt) {
      model
      action
      createdAt
      payload
    }
  }
`;
