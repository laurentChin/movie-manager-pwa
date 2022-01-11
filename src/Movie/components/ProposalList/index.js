import React from "react";

import { Proposal } from "Movie/components/Proposal";

import "./styles.css";

const ProposalList = ({ proposals, closeHandler, selectProposal }) => {
  return (
    <div className="proposal-list">
      <span className="proposal-list__close-btn" onClick={() => closeHandler()}>
        Close
      </span>
      {proposals.map(({ title, releaseDate, direction, poster }) => (
        <Proposal
          key={`${poster}_${title}_${releaseDate}`}
          title={title}
          releaseDate={releaseDate}
          direction={direction}
          poster={poster}
          select={selectProposal}
        />
      ))}
    </div>
  );
};

export default ProposalList;
