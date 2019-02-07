import { SEARCH_RESET, SEARCH_SUCCESS } from "./actionTypes";

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
