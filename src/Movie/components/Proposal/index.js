import React from "react";

import "./styles.css";

const Proposal = ({ title, releaseDate, director, poster, select }) => {
  return (
    <div
      className="proposal"
      onClick={() => select(title, releaseDate, director, poster)}
    >
      <img src={poster} alt={title} width="100px" />
      <span className="proposal__title">{title}</span>
      <span className="proposal__releaseDate">{releaseDate}</span>
      <span className="proposal__direction">{director}</span>
    </div>
  );
};

export default Proposal;
