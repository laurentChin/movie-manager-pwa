import {
  MOVIES_REQUEST_PENDING,
  MOVIES_REQUEST_SUCCESS,
  MOVIES_REQUEST_FAILURE,
  MOVIE_CREATION_PENDING,
  MOVIE_CREATION_SUCCESS,
  MOVIE_CREATION_FAILURE,
  MOVIE_REQUEST_PENDING,
  MOVIE_REQUEST_SUCCESS,
  MOVIE_REQUEST_FAILURE,
  MOVIE_UPDATE_PENDING,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_UPDATE_FAILURE,
  MOVIE_DELETE_PENDING,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DELETE_FAILURE,
  MOVIE_BULK_IMPORT_PENDING,
  MOVIE_BULK_IMPORT_SUCCESS,
  MOVIE_BULK_IMPORT_FAILURE
} from "./ActionTypes";

import api from "../core/Api";
import { GraphQLClient } from "../core";
import { queries } from "./graphql";

import { MOVIE_ITEMS_LIMIT } from "./constants";

const fetchMovies = offset => {
  return dispatch => {
    dispatch({
      type: MOVIES_REQUEST_PENDING
    });

    GraphQLClient.query({
      query: queries.MOVIES,
      variables: {
        offset,
        limit: MOVIE_ITEMS_LIMIT
      }
    })
      .then(response => {
        const {
          data: { movies }
        } = response;

        dispatch({
          type: MOVIES_REQUEST_SUCCESS,
          movies,
          offset: offset + MOVIE_ITEMS_LIMIT
        });
      })
      .catch(error => {
        dispatch({
          type: MOVIES_REQUEST_FAILURE,
          error
        });
      });
  };
};

const fetchMovie = id => {
  return dispatch => {
    dispatch({
      type: MOVIE_REQUEST_PENDING
    });

    return api
      .fetchMovie(id)
      .then(movie => {
        dispatch({
          type: MOVIE_REQUEST_SUCCESS,
          movie
        });
      })
      .catch(e => {
        dispatch({
          type: MOVIE_REQUEST_FAILURE,
          error: e
        });
      });
  };
};

const createMovie = movie => {
  return dispatch => {
    dispatch({
      type: MOVIE_CREATION_PENDING
    });

    return api
      .createMovie(movie)
      .then(json =>
        dispatch({
          type: MOVIE_CREATION_SUCCESS,
          movie: json,
          flashMessage: `'${movie.title}' has been created successfully.`
        })
      )
      .catch(e => {
        dispatch({
          type: MOVIE_CREATION_FAILURE,
          error: e,
          flashMessage: `'${movie.title}' creation fails.`
        });
      });
  };
};

const updateMovie = (id, payload) => {
  return dispatch => {
    dispatch({
      type: MOVIE_UPDATE_PENDING
    });

    return api
      .updateMovie(id, payload)
      .then(movie => {
        dispatch({
          type: MOVIE_UPDATE_SUCCESS,
          movie,
          flashMessage: `'${payload.title}' has been updated successfully.`
        });
      })
      .catch(e => {
        dispatch({
          type: MOVIE_UPDATE_FAILURE,
          error: e,
          flashMessage: `'${payload.title}' update fails.`
        });
      });
  };
};

const deleteMovie = (id, title) => {
  return dispatch => {
    dispatch({
      type: MOVIE_DELETE_PENDING
    });

    return api
      .deleteMovie(id)
      .then(() => {
        dispatch({
          type: MOVIE_DELETE_SUCCESS,
          flashMessage: `'${title}' has been deleted successfully.`
        });
      })
      .catch(e => {
        dispatch({
          type: MOVIE_DELETE_FAILURE,
          error: e,
          flashMessage: `'${title}' deletion fails.`
        });
      });
  };
};

const bulkImport = file => {
  return dispatch => {
    dispatch({
      type: MOVIE_BULK_IMPORT_PENDING
    });

    return api
      .bulkImport(file)
      .then(() => {
        dispatch({
          type: MOVIE_BULK_IMPORT_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: MOVIE_BULK_IMPORT_FAILURE,
          error
        });
      });
  };
};

export {
  fetchMovies,
  fetchMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  bulkImport
};
