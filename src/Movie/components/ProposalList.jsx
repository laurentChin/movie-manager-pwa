import React from "react";
import { useDispatch } from "react-redux";
import { resetProposalList } from "Movie/Actions";
import { Proposal } from "Movie/components/Proposal";

import "./ProposalList.css";

export const ProposalList = ({ proposals }) => {
  const dispatch = useDispatch();

  return (
    <div className="proposal-list">
      <span
        className="proposal-list__close-btn"
        onClick={() => dispatch(resetProposalList())}
      >
        Close
      </span>
      {proposals.map(({ title, releaseDate, direction, poster }) => (
        <Proposal
          key={`${poster}_${title}_${releaseDate}`}
          title={title}
          releaseDate={releaseDate}
          direction={direction}
          poster={poster}
        />
      ))}
    </div>
  );
};
