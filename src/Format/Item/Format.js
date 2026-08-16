import React from "react";

import "./Format.css";

const baseUrl = process.env.REACT_APP_API_URL;

function Format({ logo, name }) {
  return (
    <img src={`${baseUrl}/assets/${logo}`} className="format" alt={name} />
  );
}

export default Format;
