import {
  FETCH_FORMAT_LIST_FAILURE,
  FETCH_FORMAT_LIST_PENDING,
  FETCH_FORMAT_LIST_SUCCESS
} from './ActionTypes';

const initialState = {
  isFetching: false,
  formats: []
}

const formatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORMAT_LIST_PENDING:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_FORMAT_LIST_SUCCESS:
      return {
        ...state,
        formats: action.formats,
        isFetching: false
      }
    case FETCH_FORMAT_LIST_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return {
        ...state
      }
  }
}

export default formatReducer;
