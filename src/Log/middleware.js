import { FETCH_LOG_LIST_SUCCESS } from "./actionTypes";
import { sync } from "../Movie/Actions";

const findIndex = (syncMovies, payload) =>
  syncMovies.findIndex(movie => {
    return parseInt(movie.id) === parseInt(payload.id);
  });

const middleware = store => next => action => {
  const { movies } = store.getState();
  if (action.type !== FETCH_LOG_LIST_SUCCESS || !movies.initialized)
    return next(action);
  const syncMovies = [...movies.items];
  const logs = action.payload.history.reverse(); // logs must be processed chronologically

  for (const log of logs) {
    const { action: logAction, payload } = log;
    const movie = JSON.parse(payload);
    const movieIdx = findIndex(syncMovies, movie);
    switch (logAction) {
      case "CREATE":
        if (movieIdx === -1) syncMovies.push(movie);
        break;
      case "UPDATE":
        if (movieIdx > -1) syncMovies.splice(movieIdx, 1, movie);

        break;
      case "DELETE":
        if (movieIdx > -1) syncMovies.splice(movieIdx, 1);
        break;
    }
  }

  store.dispatch(sync(syncMovies));

  return next(action);
};

export default middleware;
