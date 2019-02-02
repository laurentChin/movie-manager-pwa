import { gql } from "apollo-boost";

const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String
    $director: String
    $releaseDate: String
    $poster: Upload
    $formats: [ID]
  ) {
    addMovie(
      title: $title
      director: $director
      releaseDate: $releaseDate
      poster: $poster
      formats: $formats
    ) {
      id
      title
      director
      releaseDate
      poster
      formats {
        id
        name
      }
    }
  }
`;

const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $id: ID
    $title: String
    $director: String
    $releaseDate: String
    $poster: Upload
    $formats: [ID]
  ) {
    updateMovie(
      id: $id
      title: $title
      director: $director
      releaseDate: $releaseDate
      poster: $poster
      formats: $formats
    ) {
      id
      title
      director
      releaseDate
      poster
      formats {
        id
        name
      }
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID) {
    deleteMovie(id: $id) {
      id
      title
    }
  }
`;

export default {
  ADD_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE
};
