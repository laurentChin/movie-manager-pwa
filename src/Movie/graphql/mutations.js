import { gql } from "apollo-boost";

const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String
    $direction: String
    $releaseDate: String
    $poster: Upload
    $formats: [ID]
  ) {
    addMovie(
      title: $title
      direction: $direction
      releaseDate: $releaseDate
      poster: $poster
      formats: $formats
    ) {
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

const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $id: ID
    $title: String
    $direction: String
    $releaseDate: String
    $poster: Upload
    $formats: [ID]
  ) {
    updateMovie(
      id: $id
      title: $title
      direction: $direction
      releaseDate: $releaseDate
      poster: $poster
      formats: $formats
    ) {
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
