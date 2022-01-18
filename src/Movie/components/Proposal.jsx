import React from "react";

import "./Proposal.css";

export const Proposal = ({
  title,
  releaseDate,
  direction,
  poster,
  onSelect,
}) => {
  return (
    <div
      className="proposal"
      onClick={() => onSelect({ title, releaseDate, direction, poster })}
    >
      <img src={poster} alt={title} width="100px" />
      <span className="proposal__title">{title}</span>
      <span className="proposal__releaseDate">{releaseDate}</span>
      <span className="proposal__direction">{direction}</span>
    </div>
  );
};
