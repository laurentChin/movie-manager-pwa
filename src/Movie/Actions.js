import { REQUEST_MOVIES, RECEIVE_MOVIES } from './ActionTypes';

export const requestAll = () => {
  return {
    type: REQUEST_MOVIES
  }
}

export const receiveAll = (movies) => {
  return {
    type: RECEIVE_MOVIES,
    movies
  }
}

export const fetchMovies = () => {
  return (dispatch) => {
    dispatch(requestAll());

    return fetch('http://localhost:5000/movies')
      .then(
        response => response.json(),
        console.error
      )
      .then(
        json => dispatch(receiveAll(json))
      )
  }
}