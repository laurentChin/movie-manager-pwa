import { gql } from "apollo-boost";

const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String
    $director: String
    $releaseDate: String
    $poster: Upload
    $formats: [Int]
  ) {
    addMovie(
      title: $title
      director: $director
      releaseDate: $releaseDate
      poster: $poster
      formats: $formats
    ) {
      title
      director
      releaseDate
      poster
      formats {
        name
      }
    }
  }
`;

const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $id: Int
    $title: String
    $director: String
    $releaseDate: String
    $poster: Upload
    $formats: [Int]
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
        id,
        name
      }
    }
  }
`;

export default {
  ADD_MOVIE,
  UPDATE_MOVIE
};
