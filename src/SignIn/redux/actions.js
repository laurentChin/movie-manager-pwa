import {
  SIGN_IN_START_REQUEST_PENDING,
  SIGN_IN_START_REQUEST_FAILURE,
  SIGN_IN_START_REQUEST_SUCCESS,
  SIGN_IN_FINISH_REQUEST_PENDING,
  SIGN_IN_FINISH_REQUEST_FAILURE,
  SIGN_IN_FINISH_REQUEST_SUCCESS,
} from "./actionTypes";

import { GraphQLClient } from "../../Core/GraphQLClient";
import { mutations } from "../graphql";

export const startSignIn = (email, password) => {
  return (dispatch) => {
    GraphQLClient.mutate({
      mutation: mutations.SIGN_IN,
      variables: {
        email,
        password,
      },
    })
      .then(() => {
        dispatch({
          type: SIGN_IN_START_REQUEST_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_IN_START_REQUEST_FAILURE,
          payload: {
            error: error.toString(),
          },
        });
      });
    dispatch({
      type: SIGN_IN_START_REQUEST_PENDING,
    });
  };
};

export const finishSignIn = (token) => {
  return (dispatch) => {
    GraphQLClient.mutate({
      mutation: mutations.VALIDATE_TOKEN,
      variables: {
        token,
      },
    })
      .then(() => {
        dispatch({
          type: SIGN_IN_FINISH_REQUEST_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_IN_FINISH_REQUEST_FAILURE,
          payload: {
            error: error.toString(),
          },
        });
      });
    dispatch({
      type: SIGN_IN_FINISH_REQUEST_PENDING,
    });
  };
};
