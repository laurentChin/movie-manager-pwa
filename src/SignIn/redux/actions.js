import {
  SIGN_IN_FINISH_REQUEST_PENDING,
  SIGN_IN_FINISH_REQUEST_FAILURE,
  SIGN_IN_FINISH_REQUEST_SUCCESS,
} from "./actionTypes";

import { GraphQLClient } from "Core/GraphQLClient";
import { mutations } from "../graphql";

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
