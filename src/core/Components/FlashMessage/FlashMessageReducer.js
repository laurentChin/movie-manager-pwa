import {
  FLASH_MESSAGE_SHOW,
  FLASH_MESSAGE_HIDE
} from "./FlashMessageActionTypes";

const initialState = {
  show: false,
  message: '',
  status: ''
}

const flashMessageReducer = (state = initialState, action) => {
  const {type, message, status} = action;
  switch (type) {
    case FLASH_MESSAGE_SHOW:
      return {
        ...state,
        show: true,
        message,
        status
      }
    case FLASH_MESSAGE_HIDE:
      return {
        ...state,
        show: false
      }
    default:
      return {
        ...state
      }
  }
}

export default flashMessageReducer;
