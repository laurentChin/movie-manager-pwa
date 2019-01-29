import {
  LOGIN_REQUEST_PENDING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from "./ActionTypes";

import Cookies from "js-cookie";

import { GraphQLClient } from "../core";

import { queries } from "./graphql";
import { MOVIES_REQUEST_SUCCESS } from "../Movie/ActionTypes";

export const logIn = (email, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST_PENDING
    });

    GraphQLClient.query({
      query: queries.LOG_IN,
      variables: {
        email,
        password
      }
    })
      .then(response => {
        const {
          data: {
            login: {
              jwt,
              user: { movies }
            }
          }
        } = response;

        Cookies.set("jwt", jwt);

        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(jwt);
        }

        dispatch({
          type: LOGIN_REQUEST_SUCCESS,
          payload: { jwt },
          flashMessage: `Successfully logged in as ${email}.`
        });

        dispatch({
          type: MOVIES_REQUEST_SUCCESS,
          movies
        });
      })
      .catch(error => {
        Cookies.remove("jwt");

        dispatch({
          type: LOGIN_REQUEST_FAILURE,
          payload: {
            error: error.toString()
          },
          flashMessage: `Log In failed for ${email}.`
        });
      });
  };
};
