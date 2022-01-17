import { gql } from "@apollo/client";

export const FORMATS = gql`
  query Formats {
    getFormats {
      id
      name
      logo
    }
  }
`;
