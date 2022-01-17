import React from "react";
import "./MovieList.css";

import { Movie } from "Movie/components/Movie";

export const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => {
        return <Movie key={movie.id} movie={movie} />;
      })}
    </div>
  );
};
