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
    <li className="proposal">
      <button
        type="button"
        className="proposal__button"
        onClick={() => onSelect({ title, releaseDate, direction, poster })}
      >
        <img src={poster} alt="" className="proposal__poster" />
        <span className="proposal__details">
          <span className="proposal__title">{title}</span>
          {direction && (
            <span className="proposal__direction">{direction}</span>
          )}
          {releaseDate && (
            <span className="proposal__release-date">{releaseDate}</span>
          )}
        </span>
      </button>
    </li>
  );
};
