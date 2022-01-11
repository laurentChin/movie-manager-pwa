import { GraphQLClient } from "../../Core";
import { queries } from "./index";

export const fetchMovie = (id) => {
  return GraphQLClient.query({
    query: queries.MOVIE,
    variables: {
      id,
    },
  }).then(({ data: { movie } }) => movie);
};
