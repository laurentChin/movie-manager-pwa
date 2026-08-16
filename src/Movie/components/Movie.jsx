import React, { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FormattedDate } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Movie.css";

import { FormatList } from "Format";
import { Duration } from "Duration";
import { Image } from "Core";
import { remove } from "Movie/Actions";

const assetsUrl = process.env.REACT_APP_API_URL;

export const Movie = ({
  movie: {
    id,
    title,
    poster,
    originalTitle,
    direction,
    duration,
    releaseDate,
    formats,
    synopsis,
  },
  showImage = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieEltRef = useRef();
  const dialogRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  const posterSrc = `${assetsUrl}/uploads/${poster}`;
  const posterTransitionName = `movie-poster-${id}`;

  const setDialogOpen = (open) => {
    const applyDomChanges = () => {
      if (open) {
        dialogRef.current.showModal();
      }
      flushSync(() => setIsOpen(open));
      if (!open) {
        dialogRef.current.close();
      }
    };

    if (document.startViewTransition) {
      document.startViewTransition(applyDomChanges);
    } else {
      applyDomChanges();
    }
  };

  return (
    <li className="movie-list__item">
      <button
        type="button"
        className="movie-item"
        data-item-id={id}
        ref={movieEltRef}
        onClick={() => setDialogOpen(true)}
      >
        <span
          className="movie-item__poster"
          style={{
            viewTransitionName: isOpen ? undefined : posterTransitionName,
          }}
        >
          <Image src={posterSrc} alt="" isVisible={showImage} />
        </span>
        <span className="movie-item__caption">
          <span className="movie-item__title">{title}</span>
          {formats && <FormatList formats={formats} />}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="movie-dialog"
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          setDialogOpen(false);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            setDialogOpen(false);
          }
        }}
      >
        <div
          className="movie-dialog__poster"
          style={{
            viewTransitionName: isOpen ? posterTransitionName : undefined,
          }}
        >
          <Image src={posterSrc} alt={title} isVisible={isOpen} />
        </div>
        <div className="movie-dialog__content">
          <button
            type="button"
            className="movie-dialog__close"
            onClick={() => setDialogOpen(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 id={titleId}>{title}</h2>
          {originalTitle && <small>{originalTitle}</small>}
          {direction && <small>{direction}</small>}
          <div className="infos">
            {duration && <Duration value={duration} />}
            <FormattedDate value={new Date(releaseDate)} />
            {formats && <FormatList formats={formats} />}
          </div>
          {synopsis && <p className="movie-dialog__synopsis">{synopsis}</p>}
          <div className="movie-dialog__actions">
            <button
              type="button"
              onClick={() => {
                window.sessionStorage.setItem(
                  "scrollPos",
                  movieEltRef.current.offsetTop
                );
                navigate(`/movies/${id}/update`);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                const confirm = window.confirm(
                  `Are you sure want to delete '${title}' (${direction} - ${releaseDate}) ?`
                );
                if (confirm) {
                  dispatch(remove(id, title));
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </li>
  );
};
