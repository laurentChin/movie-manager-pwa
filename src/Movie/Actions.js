import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
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

} from './ActionTypes';

import api from '../core/Api';

const requestAll = () => {
  return {
    type: REQUEST_MOVIES
  }
}

const receiveAll = (movies) => {
  return {
    type: RECEIVE_MOVIES,
    movies
  }
}

const fetchMovies = () => {
  return (dispatch) => {
    dispatch(requestAll());

    return api.fetchMovies()
      .then(
        json => dispatch(receiveAll(json))
      )
  }
}

const fetchMovie = (id) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_REQUEST_PENDING
    });

    return api.fetchMovie(id)
      .then((movie) => {
        dispatch({
          type: MOVIE_REQUEST_SUCCESS,
          movie
        });
      })
      .catch((e) => {
        dispatch({
          type: MOVIE_REQUEST_FAILURE,
          error: e
        });
      });
  };
}

const createMovie = (movie) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_CREATION_PENDING
    });

    return api.createMovie(movie)
      .then(
        json => dispatch({
          type: MOVIE_CREATION_SUCCESS,
          movie: json
        })
      )
      .catch(e => {
        dispatch({
          type: MOVIE_CREATION_FAILURE,
          error: e
        })
      })
  }
}

const updateMovie = (id, payload) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_UPDATE_PENDING
    });

    return api.updateMovie(id, payload)
      .then((movie) => {
        dispatch({
          type: MOVIE_UPDATE_SUCCESS,
          movie
        });
      })
      .catch((e) => {
        dispatch({
          type: MOVIE_UPDATE_FAILURE,
          error: e
        });
      });
  }
}

const deleteMovie = (id) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_DELETE_PENDING
    });

    return api.deleteMovie(id)
      .then(() => {
        dispatch({
          type: MOVIE_DELETE_SUCCESS
        });
      })
      .catch((e) => {
        dispatch({
          type: MOVIE_DELETE_FAILURE,
          error: e
        });
      });
  }
}

const bulkImport = (file) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_BULK_IMPORT_PENDING
    });

    return api.bulkImport(file)
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
  }
}

export {
  requestAll,
  receiveAll,
  fetchMovies,
  fetchMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  bulkImport
}
