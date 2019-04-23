import React, { useRef } from "react";
import { FormattedDate } from "react-intl";

import "./styles.css";

import { FormatList } from "../../../Format";
import { Duration } from "../../../Duration";
import { Image } from "../../../core";

const assetsUrl = process.env.REACT_APP_ASSETS_URL;

const Movie = ({ movie, edit, remove }) => {
  const movieEl = useRef(null);
  return (
    <div className="movie-item" ref={movieEl}>
      <Image src={`${assetsUrl}/${movie.poster}`} alt={movie.title} />
      <section className="movie-item__content">
        <h3>{movie.title}</h3>
        {movie.originalTitle && <small>{movie.originalTitle}</small>}
        {movie.direction && <small>{movie.direction}</small>}
        <section className="infos">
          {movie.duration && (
            <Duration className="duration" value={movie.duration} />
          )}
          <FormattedDate
            className="theater-release-Date"
            value={new Date(movie.releaseDate)}
          />
          {movie.formats && <FormatList formats={movie.formats} />}
        </section>
        <p>{movie.synopsis}</p>
      </section>
      <section className="options">
        <button onClick={() => edit(movie)}>Edit</button>
        <button
          onClick={() => {
            const confirm = window.confirm(
              `Are you sure want to delete '${movie.title}' (${
                movie.direction
              } - ${movie.releaseDate}) ?`
            );
            if (confirm) {
              remove(movie.id, movie.title);
            }
          }}
        >
          Delete
        </button>
      </section>
    </div>
  );
};

export default Movie;
