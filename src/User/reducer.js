import { FETCH_USER_SUCCESS } from "./actionTypes";

const initialState = {
  count: 0
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...payload
      };
    default:
      return {
        ...state
      };
  }
};

export default userReducer;
