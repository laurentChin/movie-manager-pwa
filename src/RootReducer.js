import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";

import movieReducer from "./Movie/Reducer";
import authReducer from "./Auth/Reducer";
import formatReducer from "./Format/Reducer";
import loaderReducer from "./core/Components/Loader/LoaderReducer";
import flashMessageReducer from "./core/Components/FlashMessage/FlashMessageReducer";
import { reducer as SignInReducer } from "./SignIn/redux";
import userReducer from "./User/reducer";

const rootReducer = history =>
  combineReducers({
    movies: movieReducer,
    auth: authReducer,
    user: userReducer,
    form: formReducer,
    format: formatReducer,
    loader: loaderReducer,
    flash: flashMessageReducer,
    signIn: SignInReducer,
    router: connectRouter(history)
  });

export default rootReducer;
