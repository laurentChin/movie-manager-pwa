import {
  FETCH_LOG_LIST_PENDING,
  FETCH_LOG_LIST_SUCCESS,
  FETCH_LOG_LIST_FAILURE
} from "./actionTypes";

import { GraphQLClient } from "../core";
import { queries } from "./graphql";

const fetch = () => {
  return (dispatch, getStore) => {
    dispatch({
      type: FETCH_LOG_LIST_PENDING
    });

    const {
      logs: { history }
    } = getStore();

    const query = {
      query: queries.LOGS
    };

    if (history.length > 0) {
      query.variables = {
        createdAt: history[0].createdAt // the first item is the last log
      };
    }

    GraphQLClient.query(query)
      .then(response => {
        const {
          data: { logs }
        } = response;
        dispatch({
          type: FETCH_LOG_LIST_SUCCESS,
          payload: { history: logs.map(log => ({ ...log, pending: true })) }
        });
      })
      .catch(e => {
        dispatch({
          type: FETCH_LOG_LIST_FAILURE,
          error: e
        });
      });
  };
};

export { fetch };
