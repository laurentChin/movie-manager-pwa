import React from "react";
import { useDispatch } from "react-redux";
import { selectProposal } from "Movie/Actions";

import "./Proposal.css";

export const Proposal = ({ title, releaseDate, direction, poster }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="proposal"
      onClick={() =>
        dispatch(selectProposal(title, releaseDate, direction, poster))
      }
    >
      <img src={poster} alt={title} width="100px" />
      <span className="proposal__title">{title}</span>
      <span className="proposal__releaseDate">{releaseDate}</span>
      <span className="proposal__direction">{direction}</span>
    </div>
  );
};
