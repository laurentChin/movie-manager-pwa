import Cookies from 'js-cookie';

import {
  FACEBOOK_LOGIN_REQUEST_PENDING,
  FACEBOOK_LOGIN_REQUEST_SUCCESS,
  FACEBOOK_LOGIN_REQUEST_FAILURE
} from "./ActionTypes";

const initialState = {
  isFetching: false,
  isAuthenticated: Cookies.get('jwt') !== undefined
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case FACEBOOK_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      };
    case FACEBOOK_LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    default:
      return {
        ...state
      }
  }
}

export default authReducer;
