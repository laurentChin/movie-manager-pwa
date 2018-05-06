import {
  LOADER_SHOW,
  LOADER_HIDE
} from './LoaderActionTypes';

const loader = store => next => action => {
  if(!/(_PENDING|_SUCCESS|_FAILURE)$/.test(action.type)) {
    return next(action);
  }

  if(/(_SUCCESS|_FAILURE)$/.test(action.type)) {
    store.dispatch({
      type: LOADER_HIDE
    });
  }

  if(/_PENDING$/.test(action.type)) {
    store.dispatch({
      type: LOADER_SHOW
    });
  }

  return next(action);
}

export default loader;
