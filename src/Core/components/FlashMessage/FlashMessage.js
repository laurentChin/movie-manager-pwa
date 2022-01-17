import React from "react";
import { useSelector } from "react-redux";

import "./FlashMessage.css";
import { selectFlashStatus, selectMessage } from "Core/selectors";

export const FlashMessage = () => {
  const message = useSelector(selectMessage);
  const status = useSelector(selectFlashStatus);

  return (
    <div className="flash-message-container" status={status}>
      <p>{message}</p>
    </div>
  );
};
