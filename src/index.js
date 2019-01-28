import React from "react";
import ReactDOM from "react-dom";

import Cookies from "js-cookie";

import Root from "./Root";
import "./index.css";

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
      if (Cookies.get("jwt")) {
        navigator.serviceWorker.controller.postMessage(Cookies.get("jwt"));
      }
    })
    .catch(() => {});
}

ReactDOM.render(<Root />, document.getElementById("root"));
