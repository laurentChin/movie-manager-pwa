import {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "./ActionTypes";

import { MOVIE_MANAGER_JWT } from "./constants";

const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem(MOVIE_MANAGER_JWT),
  jwt: localStorage.getItem(MOVIE_MANAGER_JWT)
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
        isAuthenticated: false,
        jwt: null
      };
    default:
      return state;
  }
};

export default authReducer;
