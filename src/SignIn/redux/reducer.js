import {
  SIGN_IN_START_REQUEST_SUCCESS,
  SIGN_IN_START_REQUEST_PENDING,
  SIGN_IN_START_REQUEST_FAILURE,
  SIGN_IN_FINISH_REQUEST_SUCCESS,
  SIGN_IN_FINISH_REQUEST_PENDING,
  SIGN_IN_FINISH_REQUEST_FAILURE
} from "./actionTypes";

const initialState = {
  startSuccess: false,
  startError: null,
  finishSuccess: false,
  finishError: null
};

const signInReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_START_REQUEST_SUCCESS:
      return {
        ...state,
        startSuccess: true
      };
    case SIGN_IN_START_REQUEST_PENDING:
      return {
        ...state,
        startSuccess: false
      };
    case SIGN_IN_START_REQUEST_FAILURE:
      return {
        ...state,
        startSuccess: false,
        startError: payload.error
      };
    case SIGN_IN_FINISH_REQUEST_SUCCESS:
      return {
        ...state,
        finishSuccess: true
      };
    case SIGN_IN_FINISH_REQUEST_PENDING:
      return {
        ...state,
        finishSuccess: false
      };
    case SIGN_IN_FINISH_REQUEST_FAILURE:
      return {
        ...state,
        finishSuccess: false,
        finishError: payload.error
      };
    default:
      return {
        ...state
      };
  }
};

export default signInReducer;
