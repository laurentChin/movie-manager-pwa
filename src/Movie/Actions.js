import { push } from "connected-react-router";

import { change } from "redux-form";

import {
  MOVIES_REQUEST_PENDING,
  MOVIES_REQUEST_SUCCESS,
  MOVIES_REQUEST_FAILURE,
  MOVIE_CREATION_PENDING,
  MOVIE_CREATION_SUCCESS,
  MOVIE_CREATION_FAILURE,
  MOVIE_UPDATE_PENDING,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_UPDATE_FAILURE,
  MOVIE_DELETE_PENDING,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DELETE_FAILURE,
  MOVIE_BULK_IMPORT_PENDING,
  MOVIE_BULK_IMPORT_SUCCESS,
  MOVIE_BULK_IMPORT_FAILURE,
  MOVIE_SELECT,
  MOVIE_SEARCH_PENDING,
  MOVIE_SEARCH_SUCCESS,
  MOVIE_SEARCH_FAILURE,
  RESET_PROPOSAL_LIST
} from "./ActionTypes";

import api from "../core/Api";
import { GraphQLClient } from "../core";
import { queries, mutations } from "./graphql";

import { MOVIE_ITEMS_LIMIT } from "./constants";
import { HOME_PAGE } from "../constants";

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

        const hasMoreToFetch = movies.length !== 0;

        dispatch({
          type: MOVIES_REQUEST_SUCCESS,
          movies,
          hasMoreToFetch,
          offset: hasMoreToFetch ? offset + MOVIE_ITEMS_LIMIT : offset
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

const create = ({ title, director, releaseDate, poster, formats }) => {
  return dispatch => {
    dispatch({
      type: MOVIE_CREATION_PENDING
    });

    GraphQLClient.mutate({
      mutation: mutations.ADD_MOVIE,
      variables: {
        title,
        director,
        releaseDate,
        poster,
        formats: formats.map(format => format.id)
      }
    })
      .then(response => {
        const {
          data: { addMovie: movie }
        } = response;
        dispatch({
          type: MOVIE_CREATION_SUCCESS,
          movie,
          flashMessage: `'${movie.title}' has been created successfully.`
        });
        dispatch(push(HOME_PAGE));
      })
      .catch(error => {
        dispatch({
          type: MOVIE_CREATION_FAILURE,
          error: error,
          flashMessage: `'${title}' creation fails.`
        });
      });
  };
};

const update = ({ id, title, director, releaseDate, poster, formats }) => {
  return dispatch => {
    dispatch({
      type: MOVIE_UPDATE_PENDING
    });

    GraphQLClient.mutate({
      mutation: mutations.UPDATE_MOVIE,
      variables: {
        id: parseInt(id),
        title,
        director,
        releaseDate,
        poster,
        formats: formats
          .filter(format => format.id)
          .map(format => parseInt(format.id))
      }
    })
      .then(response => {
        const {
          data: { updateMovie: movie }
        } = response;

        dispatch({
          type: MOVIE_UPDATE_SUCCESS,
          movie,
          flashMessage: `'${title}' has been updated successfully.`
        });
      })
      .catch(error => {
        dispatch({
          type: MOVIE_UPDATE_FAILURE,
          error,
          flashMessage: `'${title}' update fails.`
        });
      });
  };
};

const deleteMovie = (id, title) => {
  return dispatch => {
    dispatch({
      type: MOVIE_DELETE_PENDING
    });

    GraphQLClient.mutate({
      mutation: mutations.DELETE_MOVIE,
      variables: {
        id: parseInt(id)
      }
    })
      .then(response => {
        const {
          data: { deleteMovie: movie }
        } = response;

        dispatch({
          type: MOVIE_DELETE_SUCCESS,
          id: movie.id,
          flashMessage: `'${movie.title}' has been deleted successfully.`
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

const search = terms => {
  return dispatch => {
    dispatch({
      type: MOVIE_SEARCH_PENDING
    });

    GraphQLClient.query({
      query: queries.SEARCH,
      variables: {
        terms
      }
    })
      .then(response => {
        const {
          data: { explore: results }
        } = response;

        dispatch({
          type: MOVIE_SEARCH_SUCCESS,
          payload: {
            results
          }
        });
      })
      .catch(error => {
        dispatch({
          type: MOVIE_SEARCH_FAILURE,
          error
        });
      });
  };
};

const resetProposalList = () => {
  return dispatch => {
    dispatch({
      type: RESET_PROPOSAL_LIST
    });
  };
};

const selectProposal = (title, releaseDate, director, poster) => {
  return dispatch => {
    dispatch(change("movie", "title", title));
    dispatch(change("movie", "releaseDate", releaseDate));
    dispatch(change("movie", "director", director));
    dispatch(change("movie", "poster", poster));

    dispatch({
      type: RESET_PROPOSAL_LIST
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

const editMovie = movie => {
  return dispatch => {
    dispatch({
      type: MOVIE_SELECT,
      movie
    });

    dispatch(push(`/movies/${movie.id}/update`));
  };
};

export {
  fetchMovies,
  create,
  update,
  deleteMovie,
  bulkImport,
  editMovie,
  search,
  resetProposalList,
  selectProposal
};
