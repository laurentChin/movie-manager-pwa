import React from "react";
import { FormattedDate } from "react-intl";

import "./styles.css";

import { FormatList } from "../../../Format";
import { Duration } from "../../../Duration";
import { Image } from "../../../core";

const assetsUrl = process.env.REACT_APP_ASSETS_URL;

const Movie = ({ movie, editMovie, deleteMovie }) => {
  return (
    <div className="movie-item">
      <Image src={`${assetsUrl}/${movie.poster}`} alt={movie.title} />
      <section className="movie-item__content">
        <h3>{movie.title}</h3>
        {movie.originalTitle && <small>{movie.originalTitle}</small>}
        {movie.director && <small>{movie.director}</small>}
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
        <button onClick={() => editMovie(movie)}>Edit</button>
        <button
          onClick={() => {
            const confirm = window.confirm(
              `Are you sure want to delete '${movie.title}' (${
                movie.director
              } - ${movie.releaseDate}) ?`
            );
            if (confirm) {
              deleteMovie(movie.id, movie.title);
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