import { REQUEST_MOVIES, RECEIVE_MOVIES } from './ActionTypes';

const initialState = {
  isFetching: false,
  items: []
};

const movieReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case REQUEST_MOVIES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_MOVIES:
      return {
        ...state,
        isFetching: false,
        items: action.movies
      }
    default:
      return state;
  }
}

export default movieReducer;
