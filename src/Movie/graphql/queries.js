import { gql } from "@apollo/client";

export const MOVIES = gql`
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

export const MOVIE = gql`
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
  }
`;

export const SEARCH = gql`
  query Explore($terms: String, $byDirector: Boolean) {
    explore(terms: $terms, byDirector: $byDirector) {
      title
      direction
      releaseDate
      poster
    }
  }
`;
