import React from "react";

import "./styles.css";

const Proposal = ({ title, releaseDate, direction, poster, select }) => {
  return (
    <div
      className="proposal"
      onClick={() => select(title, releaseDate, direction, poster)}
    >
      <img src={poster} alt={title} width="100px" />
      <span className="proposal__title">{title}</span>
      <span className="proposal__releaseDate">{releaseDate}</span>
      <span className="proposal__direction">{direction}</span>
    </div>
  );
};

export default Proposal;
