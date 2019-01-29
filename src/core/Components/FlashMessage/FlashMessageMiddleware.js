import {
  FLASH_MESSAGE_SHOW,
  FLASH_MESSAGE_HIDE
} from "./FlashMessageActionTypes";

const flashMessage = store => next => action => {
  if (!/(_PENDING|_SUCCESS|_FAILURE)$/.test(action.type)) {
    return next(action);
  }

  const mutationActionRegexp = new RegExp("_(SUCCESS|FAILURE)$");
  if (mutationActionRegexp.test(action.type) && action.flashMessage) {
    const [, status] = mutationActionRegexp.exec(action.type);
    store.dispatch({
      type: FLASH_MESSAGE_SHOW,
      message: action.flashMessage,
      status: status.toLowerCase()
    });

    setTimeout(() => {
      store.dispatch({
        type: FLASH_MESSAGE_HIDE
      });
    }, 2500);
  }

  return next(action);
};

export default flashMessage;
