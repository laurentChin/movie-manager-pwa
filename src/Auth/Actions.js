import { FACEBOOK_LOGIN_REQUEST_PENDING, FACEBOOK_LOGIN_REQUEST_SUCCESS, FACEBOOK_LOGIN_REQUEST_FAILURE } from './ActionTypes';

import Cookies from 'js-cookie';

import api from "../core/Api";

export const facebookLogin = (code) => {
  return (dispatch) => {
    dispatch({
      type: FACEBOOK_LOGIN_REQUEST_PENDING
    });

    return api.facebookLogin(code)
      .then(jwt => {
        Cookies.set('jwt', jwt);

        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(jwt);
        }

        dispatch({
          type: FACEBOOK_LOGIN_REQUEST_SUCCESS,
          jwt
        });
      })
      .catch((e) => {
        // makes sure the jwt item is empty at login failure
        Cookies.remove('jwt');
        dispatch({
          type: FACEBOOK_LOGIN_REQUEST_FAILURE,
          error: e
        })
      });
  }
}
