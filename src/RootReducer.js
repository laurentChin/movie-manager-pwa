import { combineReducers } from 'redux';

import {reducer as formReducer} from 'redux-form';

import movieReducer from './Movie/Reducer';
import authReducer from './Auth/Reducer';
import formatReducer from "./Format/Reducer";
import loaderReducer from "./core/Components/Loader/LoaderReducer";
import flashMessageReducer from "./core/Components/FlashMessage/FlashMessageReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  form: formReducer,
  format: formatReducer,
  loader: loaderReducer,
  flash: flashMessageReducer
});

export default rootReducer;
