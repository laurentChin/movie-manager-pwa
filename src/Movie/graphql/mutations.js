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

export default {
  ADD_MOVIE
};
