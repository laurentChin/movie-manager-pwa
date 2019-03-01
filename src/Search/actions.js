import { SEARCH_SUCCESS, SEARCH_RESET } from "./actionTypes";

const search = terms => {
  return (dispatch, getStore) => {
    const searchRegEx = new RegExp(`${terms}`, "i");
    const { movies } = getStore();

    const matches = movies.items.filter(movie => searchRegEx.test(movie.title));

    dispatch({
      type: SEARCH_SUCCESS,
      payload: {
        matches
      }
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
