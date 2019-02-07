import {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "./ActionTypes";

const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem("jwt"),
  jwt: localStorage.getItem("jwt")
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        jwt: payload.jwt
      };
    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
