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
  MOVIE_SEARCH_PENDING,
  MOVIE_SEARCH_SUCCESS,
  MOVIE_SEARCH_FAILURE,
  RESET_PROPOSAL_LIST,
  MOVIE_SYNC,
  PAGINATE_ITEMS,
} from "./ActionTypes";

import { GraphQLClient } from "../Core";
import { queries, mutations } from "./graphql";

import { MOVIE_ITEMS_LIMIT } from "./constants";

const fetch = (offset = 0, limit = MOVIE_ITEMS_LIMIT) => {
  return (dispatch) => {
    dispatch({
      type: MOVIES_REQUEST_PENDING,
    });

    GraphQLClient.query({
      query: queries.MOVIES,
      variables: {
        offset,
        limit,
      },
    })
      .then((response) => {
        const {
          data: { movies },
        } = response;

        dispatch({
          type: MOVIES_REQUEST_SUCCESS,
          payload: {
            movies,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: MOVIES_REQUEST_FAILURE,
          error,
        });
      });
  };
};

const create = ({ title, direction, releaseDate, poster, formats }) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_CREATION_PENDING,
    });

    return GraphQLClient.mutate({
      mutation: mutations.ADD_MOVIE,
      variables: {
        title,
        direction,
        releaseDate,
        ...(typeof poster === "string"
          ? { posterUrl: poster }
          : { poster: poster[0] }),
        formats: formats.map((format) => format.id),
      },
    })
      .then((response) => {
        const {
          data: { addMovie: movie },
        } = response;
        dispatch({
          type: MOVIE_CREATION_SUCCESS,
          movie,
          flashMessage: `'${movie.title}' has been created successfully.`,
        });

        return movie;
      })
      .catch((error) => {
        dispatch({
          type: MOVIE_CREATION_FAILURE,
          error: error,
          flashMessage: `'${title}' creation fails.`,
        });
      });
  };
};

const update = ({ id, title, direction, releaseDate, poster, formats }) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_UPDATE_PENDING,
    });

    GraphQLClient.mutate({
      mutation: mutations.UPDATE_MOVIE,
      variables: {
        id: parseInt(id),
        title,
        direction,
        releaseDate,
        ...(typeof poster === "string"
          ? { posterUrl: poster }
          : { poster: poster[0] }),
        formats: formats
          .filter((format) => format.id)
          .map((format) => parseInt(format.id)),
      },
    })
      .then((response) => {
        const {
          data: { updateMovie: movie },
        } = response;

        dispatch({
          type: MOVIE_UPDATE_SUCCESS,
          movie,
          flashMessage: `'${title}' has been updated successfully.`,
        });
      })
      .catch((error) => {
        if (error.graphQLErrors[0]?.extensions?.code === 404) {
          dispatch({
            type: MOVIE_DELETE_SUCCESS,
            id,
            flashMessage: `'${title}' has been previously deleted.`,
          });
        } else {
          dispatch({
            type: MOVIE_UPDATE_FAILURE,
            error,
            flashMessage: `'${title}' update fails.`,
          });
        }
      });
  };
};

const remove = (id, title) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_DELETE_PENDING,
    });

    const successAction = {
      type: MOVIE_DELETE_SUCCESS,
      id: parseInt(id),
      flashMessage: `'${title}' has been deleted successfully.`,
    };

    GraphQLClient.mutate({
      mutation: mutations.DELETE_MOVIE,
      variables: {
        id: parseInt(id),
      },
    })
      .then(() => {
        dispatch(successAction);
      })
      .catch((e) => {
        if (e.graphQLErrors[0]?.extensions?.code === 404) {
          dispatch(successAction);
        } else {
          dispatch({
            type: MOVIE_DELETE_FAILURE,
            error: e,
            flashMessage: `'${title}' deletion fails.`,
          });
        }
      });
  };
};

const search = (terms) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_SEARCH_PENDING,
    });

    GraphQLClient.query({
      query: queries.SEARCH,
      variables: {
        terms,
      },
    })
      .then((response) => {
        const {
          data: { explore: results },
        } = response;

        dispatch({
          type: MOVIE_SEARCH_SUCCESS,
          payload: {
            results,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: MOVIE_SEARCH_FAILURE,
          error,
        });
      });
  };
};

const resetProposalList = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_PROPOSAL_LIST,
    });
  };
};

const selectProposal = (title, releaseDate, direction, poster) => {
  return (dispatch) => {
    dispatch(change("movie", "title", title));
    dispatch(change("movie", "releaseDate", releaseDate));
    dispatch(change("movie", "direction", direction));
    dispatch(change("movie", "poster", poster));

    dispatch({
      type: RESET_PROPOSAL_LIST,
    });
  };
};

const sync = (movies) => {
  return (dispatch) => {
    dispatch({
      type: MOVIE_SYNC,
      payload: {
        movies,
      },
    });
  };
};

const paginate = (offset) => {
  return (dispatch) => {
    dispatch({
      type: PAGINATE_ITEMS,
      payload: {
        offset,
      },
    });
  };
};

export {
  fetch,
  create,
  update,
  remove,
  search,
  resetProposalList,
  selectProposal,
  sync,
  paginate,
};
