import {
  SIGN_IN_START_REQUEST_SUCCESS,
  SIGN_IN_START_REQUEST_PENDING,
  SIGN_IN_START_REQUEST_FAILURE
} from "./actionTypes";

const initialState = {
  startSuccess: false
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
    default:
      return {
        ...state
      };
  }
};

export default signInReducer;
