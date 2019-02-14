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

const SEARCH = gql`
  query Explore($terms: String) {
    explore(terms: $terms) {
      title
      director
      releaseDate
      poster
    }
  }
`;

export default {
  MOVIES,
  SEARCH
};
