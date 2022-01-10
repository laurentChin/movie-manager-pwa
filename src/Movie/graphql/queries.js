import { gql } from "apollo-boost";

const MOVIES = gql`
  query Movies($offset: Int, $limit: Int) {
    movies(offset: $offset, limit: $limit) {
      id
      title
      direction
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

const MOVIE = gql`
  query Movie($id: Int) {
    movie(id: $id) {
      id
      title
      direction
      releaseDate
      poster
      formats {
        id
        name
        logo
      }
  }
}`;

const SEARCH = gql`
  query Explore($terms: String) {
    explore(terms: $terms) {
      title
      direction
      releaseDate
      poster
    }
  }
`;

export default {
  MOVIES,
  MOVIE,
  SEARCH,
};
