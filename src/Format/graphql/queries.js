import { gql } from "apollo-boost";

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
  FORMATS
};
