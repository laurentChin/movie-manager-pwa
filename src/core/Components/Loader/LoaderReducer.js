import {
  LOADER_HIDE,
  LOADER_SHOW
} from "./LoaderActionTypes";

const loaderReducer = (state = {loading: false}, action) => {
  switch (action.type) {
    case LOADER_HIDE:
      return {
        ...state,
        loading: false
      }
    case LOADER_SHOW:
      return {
        ...state,
        loading: true
      }
    default:
      return {
        ...state
      }
  }
}

export default loaderReducer;
