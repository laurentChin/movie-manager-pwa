import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";

import movieReducer from "./Movie/Reducer";
import authReducer from "./Auth/Reducer";
import formatReducer from "./Format/Reducer";
import loaderReducer from "./core/Components/Loader/LoaderReducer";
import flashMessageReducer from "./core/Components/FlashMessage/FlashMessageReducer";
import { reducer as SignInReducer } from "./SignIn/redux";

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  form: formReducer,
  format: formatReducer,
  loader: loaderReducer,
  flash: flashMessageReducer,
  signIn: SignInReducer
});

export default rootReducer;
