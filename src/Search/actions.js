import {
  SEARCH_PENDING,
  SEARCH_SUCCESS,
  SEARCH_RESET,
  SEARCH_FAILURE
} from "./actionTypes";
import { GraphQLClient } from "../core";
import { queries } from "./graphql";

const search = terms => {
  return (dispatch, getStore) => {
    dispatch({
      type: SEARCH_PENDING
    });

    const searchRegEx = new RegExp(`${terms}`, "i");
    const { movies } = getStore();

    const matches = movies.items.filter(movie => searchRegEx.test(movie.title));
    const ids = matches.map(movie => movie.id);

    GraphQLClient.query({
      query: queries.SEARCH,
      variables: {
        terms
      }
    })
      .then(response => {
        const {
          data: { search: results }
        } = response;

        dispatch({
          type: SEARCH_SUCCESS,
          payload: {
            matches: results.filter(result => !ids.includes(result.id))
          }
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_FAILURE,
          payload: {
            error
          }
        });
      });
  };
};

const reset = () => {
  return dispatch => {
    dispatch({
      type: SEARCH_RESET
    });
  };
};

export { search, reset };
