import React, { useId } from "react";
import { createPortal } from "react-dom";
import { FormattedDate } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FormatList } from "Format";
import { Duration } from "Duration";
import { Image } from "Core";
import { remove } from "Movie/Actions";
import { ACTIVE_POSTER_TRANSITION_NAME } from "Movie/components/Movie";

const assetsUrl = process.env.REACT_APP_API_URL;

export const MovieDialog = ({ dialogRef, movie, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleId = useId();

  return createPortal(
    <dialog
      ref={dialogRef}
      className="movie-dialog"
      aria-labelledby={movie ? titleId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      {movie && (
        <>
          <div
            className="movie-dialog__poster"
            style={{
              viewTransitionName: isOpen
                ? ACTIVE_POSTER_TRANSITION_NAME
                : undefined,
            }}
          >
            <Image
              src={`${assetsUrl}/uploads/${movie.poster}`}
              alt={movie.title}
              isVisible={isOpen}
            />
          </div>
          <div className="movie-dialog__content">
            <button
              type="button"
              className="movie-dialog__close"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 id={titleId}>{movie.title}</h2>
            {movie.originalTitle && <small>{movie.originalTitle}</small>}
            {movie.direction && <small>{movie.direction}</small>}
            <div className="infos">
              {movie.duration && <Duration value={movie.duration} />}
              <FormattedDate value={new Date(movie.releaseDate)} />
              {movie.formats && <FormatList formats={movie.formats} />}
            </div>
            {movie.synopsis && (
              <p className="movie-dialog__synopsis">{movie.synopsis}</p>
            )}
            <div className="movie-dialog__actions">
              <button
                type="button"
                onClick={() => {
                  const tile = document.querySelector(
                    `[data-item-id="${movie.id}"]`
                  );
                  if (tile) {
                    window.sessionStorage.setItem("scrollPos", tile.offsetTop);
                  }
                  navigate(`/movies/${movie.id}/update`);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  const confirm = window.confirm(
                    `Are you sure want to delete '${movie.title}' (${movie.direction} - ${movie.releaseDate}) ?`
                  );
                  if (confirm) {
                    dispatch(remove(movie.id, movie.title));
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>,
    document.body
  );
};
