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
const POSTER_FLIP_MS = 280;
const POSTER_FLIP_EASING = "cubic-bezier(0.2, 0, 0, 1)";

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// FLIP (First-Last-Invert-Play): make `el`, which is already at its
// resting position, appear to start from `fromRect` and animate to
// rest. Cheap because it only ever transforms this one element.
const flipFrom = (el, fromRect, onDone) => {
  if (!el || !fromRect || prefersReducedMotion()) {
    onDone?.();
    return;
  }

  const toRect = el.getBoundingClientRect();
  const deltaX = fromRect.left - toRect.left;
  const deltaY = fromRect.top - toRect.top;
  const scaleX = fromRect.width / toRect.width;
  const scaleY = fromRect.height / toRect.height;

  el.style.transformOrigin = "top left";
  el.style.transition = "none";
  el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
  el.offsetHeight; // eslint-disable-line no-unused-expressions -- force reflow
  el.style.transition = `transform ${POSTER_FLIP_MS}ms ${POSTER_FLIP_EASING}`;
  el.style.transform = "";

  const cleanup = () => {
    el.style.transition = "";
    el.style.transformOrigin = "";
    el.removeEventListener("transitionend", cleanup);
    onDone?.();
  };
  el.addEventListener("transitionend", cleanup, { once: true });
};

// Reverse of flipFrom: animate `el` from its resting position to look
// like `targetRect`, then call onDone (typically to hide/close it).
const flipToward = (el, targetRect, onDone) => {
  if (!el || !targetRect || prefersReducedMotion()) {
    onDone?.();
    return;
  }

  const fromRect = el.getBoundingClientRect();
  const deltaX = targetRect.left - fromRect.left;
  const deltaY = targetRect.top - fromRect.top;
  const scaleX = targetRect.width / fromRect.width;
  const scaleY = targetRect.height / fromRect.height;

  el.style.transformOrigin = "top left";
  el.style.transition = `transform ${POSTER_FLIP_MS}ms ${POSTER_FLIP_EASING}`;
  el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;

  const cleanup = () => {
    el.style.transition = "";
    el.style.transformOrigin = "";
    el.style.transform = "";
    el.removeEventListener("transitionend", cleanup);
    onDone?.();
  };
  el.addEventListener("transitionend", cleanup, { once: true });
};

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
  const gridPosterRef = useRef();
  const dialogPosterRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  const posterSrc = `${assetsUrl}/uploads/${poster}`;

  const openDialog = async () => {
    const gridRect = gridPosterRef.current.getBoundingClientRect();

    // Make sure the dialog's poster is decoded before it's shown,
    // otherwise it would pop in mid-flip.
    const preload = new window.Image();
    preload.src = posterSrc;
    await (preload.decode ? preload.decode().catch(() => {}) : null);

    dialogRef.current.showModal();
    flushSync(() => setIsOpen(true));

    flipFrom(dialogPosterRef.current, gridRect);
  };

  const closeDialog = () => {
    const gridRect = gridPosterRef.current.getBoundingClientRect();

    flipToward(dialogPosterRef.current, gridRect, () => {
      dialogRef.current.close();
      setIsOpen(false);
    });
  };

  return (
    <li className="movie-list__item">
      <button
        type="button"
        className="movie-item"
        data-item-id={id}
        ref={movieEltRef}
        onClick={openDialog}
      >
        <span className="movie-item__poster" ref={gridPosterRef}>
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
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeDialog();
          }
        }}
      >
        <div className="movie-dialog__poster" ref={dialogPosterRef}>
          <Image src={posterSrc} alt={title} isVisible={isOpen} />
        </div>
        <div className="movie-dialog__content">
          <button
            type="button"
            className="movie-dialog__close"
            onClick={closeDialog}
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
