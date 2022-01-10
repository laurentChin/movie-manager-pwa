import { gql } from "@apollo/client";

const SEARCH = gql`
  query SearchMovies($terms: String) {
    search(terms: $terms) {
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

export default { SEARCH };
