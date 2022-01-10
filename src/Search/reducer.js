import { SEARCH_RESET, SEARCH_SUCCESS } from "./actionTypes";
import { MOVIE_DELETE_SUCCESS } from "../Movie/ActionTypes";

const initialState = {
  matches: []
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        matches: action.payload.matches
      };
    case MOVIE_DELETE_SUCCESS:
      return {
        ...state,
        matches: state.matches.length > 0 ? state.matches.filter(movie => parseInt(movie.id) !== action.id) : []
      }
    case SEARCH_RESET:
      return {
        ...state,
        matches: []
      };
    default:
      return {
        ...state
      };
  }
};

export default searchReducer;
