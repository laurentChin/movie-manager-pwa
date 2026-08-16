import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FormattedDate } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FormatList } from "Format";
import { Duration } from "Duration";
import { Image } from "Core";
import { useMediaQuery } from "Core/useMediaQuery";
import { remove, update } from "Movie/Actions";
import { Form } from "Movie/components/Form";
import { ACTIVE_POSTER_TRANSITION_NAME } from "Movie/components/Movie";
import { DESKTOP_QUERY } from "Movie/constants";

const assetsUrl = process.env.REACT_APP_API_URL;

export const MovieDialog = ({
  dialogRef,
  movie,
  isOpen,
  onClose,
  onMovieUpdated,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleId = useId();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  // The fill animation must finish before a click actually confirms,
  // otherwise a fast double-click deletes before the user sees it arm.
  const [readyToConfirm, setReadyToConfirm] = useState(false);
  // Same idea for Edit: the fill plays out before it actually leaves
  // for edit mode, rather than swapping the instant it's clicked.
  const [isEnteringEdit, setIsEnteringEdit] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [confirmingForMovieId, setConfirmingForMovieId] = useState(movie?.id);
  const deleteButtonRef = useRef(null);

  const resetConfirmation = () => {
    setConfirmingDelete(false);
    setReadyToConfirm(false);
  };

  const resetEditing = () => {
    setIsEnteringEdit(false);
    setIsEditingMode(false);
  };

  // A movie change (new selection, or the dialog closing) always
  // means any in-progress confirmation/edit no longer applies.
  if (movie?.id !== confirmingForMovieId) {
    setConfirmingForMovieId(movie?.id);
    resetConfirmation();
    resetEditing();
  }

  useEffect(() => {
    if (!confirmingDelete) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (!deleteButtonRef.current?.contains(event.target)) {
        resetConfirmation();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [confirmingDelete]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={
        isEditingMode ? "movie-dialog movie-dialog--editing" : "movie-dialog"
      }
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
          {isEditingMode ? (
            <div className="movie-dialog__edit-body">
              <button
                type="button"
                className="movie-dialog__close"
                onClick={resetEditing}
                aria-label="Cancel editing"
              >
                &times;
              </button>
              <Form
                initialValues={movie}
                isUpdate
                onSubmit={async (data) => {
                  const updated = await dispatch(update(data));
                  onMovieUpdated(updated);
                  resetEditing();
                }}
              />
            </div>
          ) : (
            <>
              <div className="movie-dialog__poster">
                <div
                  className="movie-dialog__poster-backdrop"
                  aria-hidden="true"
                >
                  <Image
                    src={`${assetsUrl}/uploads/${movie.poster}`}
                    alt=""
                    isVisible={isOpen}
                  />
                </div>
                <div
                  className="movie-dialog__poster-frame"
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
              </div>
            </>
          )}
          {!isEditingMode && (
            <button
              type="button"
              className={
                isEnteringEdit
                  ? "movie-dialog__edit movie-dialog__edit--active"
                  : "movie-dialog__edit"
              }
              onClick={() => setIsEnteringEdit(true)}
              onTransitionEnd={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  event.propertyName !== "color"
                ) {
                  return;
                }
                if (isDesktop) {
                  setIsEditingMode(true);
                  return;
                }
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
          )}
          {!isEditingMode && (
            <button
              ref={deleteButtonRef}
              type="button"
              className={
                confirmingDelete
                  ? "movie-dialog__delete movie-dialog__delete--confirming"
                  : "movie-dialog__delete"
              }
              onClick={async () => {
                if (!confirmingDelete) {
                  setConfirmingDelete(true);
                  return;
                }
                if (!readyToConfirm) {
                  return;
                }
                await dispatch(remove(movie.id, movie.title));
                onClose();
              }}
              onTransitionEnd={(event) => {
                if (
                  event.target === event.currentTarget &&
                  event.propertyName === "color"
                ) {
                  setReadyToConfirm(true);
                }
              }}
            >
              {confirmingDelete ? "Confirm deletion" : "Delete"}
            </button>
          )}
        </>
      )}
    </dialog>,
    document.body
  );
};
