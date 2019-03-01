import {
  FETCH_LOG_LIST_PENDING,
  FETCH_LOG_LIST_SUCCESS,
  FETCH_LOG_LIST_FAILURE
} from "./actionTypes";

const initialState = {
  isFetching: false,
  history: []
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOG_LIST_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_LOG_LIST_SUCCESS:
      const { history } = action.payload;
      return {
        ...state,
        history,
        isFetching: false
      };
    case FETCH_LOG_LIST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default logReducer;
