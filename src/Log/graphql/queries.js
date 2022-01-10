import { gql } from "@apollo/client";

const LOGS = gql`
  query FetchLogs($createdAt: String) {
    logs(createdAt: $createdAt) {
      model
      action
      createdAt
      payload
    }
  }
`;

export default { LOGS };
