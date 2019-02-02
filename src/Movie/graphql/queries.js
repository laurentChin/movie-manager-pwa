import { gql } from "apollo-boost";

const MOVIES = gql`
  query Movies($offset: Int, $limit: Int) {
    movies(offset: $offset, limit: $limit) {
      id
      title
      director
      releaseDate
      poster
      formats {
        id
        name
        logo
      }
    }
  }
`;

export default {
  MOVIES
};
