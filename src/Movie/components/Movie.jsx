import React from "react";

import "./Movie.css";

import { FormatList } from "Format";
import { Image } from "Core";

const assetsUrl = process.env.REACT_APP_API_URL;
export const ACTIVE_POSTER_TRANSITION_NAME = "movie-poster-active";

export const Movie = ({
  movie: { id, title, poster, formats },
  showImage = false,
  isActive = false,
  isDialogOpen = false,
  onSelect,
}) => {
  const posterSrc = `${assetsUrl}/uploads/${poster}`;

  return (
    <li className="movie-list__item">
      <button
        type="button"
        className="movie-item"
        data-item-id={id}
        onClick={onSelect}
      >
        <span
          className="movie-item__poster"
          style={{
            viewTransitionName:
              isActive && !isDialogOpen
                ? ACTIVE_POSTER_TRANSITION_NAME
                : undefined,
            visibility: isActive && isDialogOpen ? "hidden" : "visible",
          }}
        >
          <Image src={posterSrc} alt="" isVisible={showImage} />
        </span>
        <span className="movie-item__caption">
          <span className="movie-item__title">{title}</span>
          {formats && <FormatList formats={formats} />}
        </span>
      </button>
    </li>
  );
};
