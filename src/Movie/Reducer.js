import {
  MOVIES_REQUEST_PENDING,
  MOVIES_REQUEST_SUCCESS,
  MOVIES_REQUEST_FAILURE,
  MOVIE_CREATION_PENDING,
  MOVIE_CREATION_SUCCESS,
  MOVIE_CREATION_FAILURE,
  MOVIE_SELECT,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_DELETE_SUCCESS,
  MOVIE_SEARCH_SUCCESS,
  RESET_PROPOSAL_LIST,
  MOVIE_SYNC,
  PAGINATE_ITEMS
} from "./ActionTypes";
import { orderBy } from "natural-orderby";

const initialState = {
  isFetching: false,
  items: [],
  offset: 0,
  limit: parseInt(process.env.REACT_APP_MOVIE_LIST_ITEM_LIMIT),
  selected: null,
  isProcessingCreation: false,
  proposals: [],
  initialized: false
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case MOVIES_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload.movies,
        initialized: true
      };
    case MOVIES_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case MOVIE_CREATION_PENDING:
      return {
        ...state,
        isProcessingCreation: true,
        creationDone: false
      };
    case MOVIE_CREATION_SUCCESS:
      return {
        ...state,
        items: orderBy([...state.items, action.movie], "title", "asc"),
        isProcessingCreation: false,
        creationDone: true
      };
    case MOVIE_CREATION_FAILURE:
      return {
        ...state,
        isProcessingCreation: false,
        creationDone: false,
        error: action.e
      };
    case MOVIE_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(movie => parseInt(movie.id) !== action.id)
      };
    case MOVIE_UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map(movie => {
          if (parseInt(movie.id) === action.movie.id) {
            return action.movie;
          }

          return movie;
        })
      };
    case MOVIE_SELECT:
      return {
        ...state,
        selected: action.payload.movie
      };
    case MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        proposals: action.payload.results
      };
    case RESET_PROPOSAL_LIST:
      return {
        ...state,
        proposals: []
      };
    case MOVIE_SYNC:
      return {
        ...state,
        items: orderBy(action.payload.movies, "title", "asc")
      };
    case PAGINATE_ITEMS:
      return {
        ...state,
        offset: action.payload.offset
      };
    default:
      return state;
  }
};

export default movieReducer;
