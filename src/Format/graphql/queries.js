import { gql } from "@apollo/client";

const FORMATS = gql`
  query Formats {
    getFormats {
      id
      name
      logo
    }
  }
`;

export default {
  FORMATS,
};
