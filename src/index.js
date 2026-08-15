import React from "react";
import { createRoot } from "react-dom/client";

import Root from "./Root";
import "./index.css";

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => {
      if (localStorage.getItem("jwt")) {
        navigator.serviceWorker.controller.postMessage(
          localStorage.getItem("jwt")
        );
      }
    })
    .catch(() => {});
}

createRoot(document.getElementById("root")).render(<Root />);
