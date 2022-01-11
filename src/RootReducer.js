import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";

import movieReducer from "./Movie/Reducer";
import authReducer from "./Auth/Reducer";
import formatReducer from "./Format/Reducer";
import loaderReducer from "./Core/components/Loader/LoaderReducer";
import flashMessageReducer from "./Core/components/FlashMessage/FlashMessageReducer";
import { reducer as SignInReducer } from "./SignIn/redux";
import userReducer from "./User/reducer";
import searchReducer from "./Search/reducer";
import logReducer from "./Log/reducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  user: userReducer,
  form: formReducer,
  format: formatReducer,
  loader: loaderReducer,
  flash: flashMessageReducer,
  signIn: SignInReducer,
  search: searchReducer,
  logs: logReducer,
});

export default rootReducer;
