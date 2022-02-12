import React from "react";
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

  return (
    <div className="movie-item" data-item-id={id}>
      <Image
        src={`${assetsUrl}/uploads/${poster}`}
        alt={title}
        isVisible={showImage}
      />
      <section className="movie-item__content">
        <h3>{title}</h3>
        {originalTitle && <small>{originalTitle}</small>}
        {direction && <small>{direction}</small>}
        <section className="infos">
          {duration && <Duration className="duration" value={duration} />}
          <FormattedDate
            className="theater-release-Date"
            value={new Date(releaseDate)}
          />
          {formats && <FormatList formats={formats} />}
        </section>
        <p>{synopsis}</p>
      </section>
      <section className="options">
        <button
          onClick={() => {
            navigate(`/movies/${id}/update`);
          }}
        >
          Edit
        </button>
        <button
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
      </section>
    </div>
  );
};
