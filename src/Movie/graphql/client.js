import { GraphQLClient } from "../../Core";
import { MOVIE } from "./queries";

export const fetchMovie = (id) => {
  return GraphQLClient.query({
    query: MOVIE,
    variables: {
      id,
    },
  }).then(({ data: { movie } }) => movie);
};
