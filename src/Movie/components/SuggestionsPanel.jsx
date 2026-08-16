import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import "./SuggestionsPanel.css";

import { resetProposalList } from "Movie/Actions";
import { Proposal } from "Movie/components/Proposal";
import { useMediaQuery } from "Core/useMediaQuery";
import { DESKTOP_QUERY } from "Movie/constants";

export const SuggestionsPanel = ({ proposals, onSelect }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const hasProposals = proposals.length > 0;
  // On desktop the panel is a permanent part of the layout; on mobile
  // it's a bottom sheet that only appears once there's something to show.
  const isOpen = isDesktop || hasProposals;

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
    if (isDesktop || !isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(resetProposalList());
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isDesktop, dispatch]);

  return (
    <dialog
      ref={dialogRef}
      className="suggestions-panel"
      aria-label="Search results"
    >
      {!isDesktop && (
        <div className="suggestions-panel__header">
          <span>Suggestions</span>
          <button
            type="button"
            onClick={() => dispatch(resetProposalList())}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
      {hasProposals ? (
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
      ) : (
        isDesktop && (
          <p className="suggestions-panel__placeholder">
            Type at least 3 characters in the title or director field to see
            suggestions.
          </p>
        )
      )}
    </dialog>
  );
};
