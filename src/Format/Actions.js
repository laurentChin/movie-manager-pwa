import {
  FETCH_FORMAT_LIST_PENDING,
  FETCH_FORMAT_LIST_SUCCESS,
  FETCH_FORMAT_LIST_FAILURE,
} from "./ActionTypes";

import { GraphQLClient } from "../Core";
import { FORMATS } from "Format/graphql/queries";

const fetchFormats = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_FORMAT_LIST_PENDING,
    });
    GraphQLClient.query({
      query: FORMATS,
    })
      .then((response) => {
        const {
          data: { getFormats: formats },
        } = response;
        dispatch({
          type: FETCH_FORMAT_LIST_SUCCESS,
          formats,
        });
      })
      .catch((e) => {
        dispatch({
          type: FETCH_FORMAT_LIST_FAILURE,
          error: e,
        });
      });
  };
};

export { fetchFormats };
