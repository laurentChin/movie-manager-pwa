import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import "./SuggestionsPanel.css";

import { resetProposalList } from "Movie/Actions";
import { Proposal } from "Movie/components/Proposal";

export const SuggestionsPanel = ({ proposals, onSelect }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef();
  const isOpen = proposals.length > 0;

  const close = () => dispatch(resetProposalList());

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      if (!dialog.open) {
        dialog.show();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(resetProposalList());
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, dispatch]);

  return (
    <dialog
      ref={dialogRef}
      className="suggestions-panel"
      aria-label="Search results"
    >
      <div className="suggestions-panel__header">
        <span>Suggestions</span>
        <button type="button" onClick={close} aria-label="Close">
          &times;
        </button>
      </div>
      <ul className="suggestions-panel__list">
        {proposals.map(({ title, releaseDate, direction, poster }) => (
          <Proposal
            key={`${poster}_${title}_${releaseDate}`}
            title={title}
            releaseDate={releaseDate}
            direction={direction}
            poster={poster}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </dialog>
  );
};
