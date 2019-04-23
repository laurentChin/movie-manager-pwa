import React from "react";

import "./MovieList.css";

import { Movie } from "../../containers";

const MovieList = ({ movies, offset, limit, paginate }) => {
  const previousOffset = offset - limit >= 0 ? offset - limit : -1;
  const nextOffset = offset + limit < movies.length ? offset + limit : null;

  return (
    <>
      {previousOffset >= 0 && (
        <button
          className="previous-btn"
          onClick={() => paginate(previousOffset)}
        >
          Previous
        </button>
      )}
      <div className="movie-list">
        {movies.slice(offset, offset + limit).map(movie => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
      {nextOffset && (
        <button className="next-btn" onClick={() => paginate(nextOffset)}>
          Next
        </button>
      )}
    </>
  );
};

export default MovieList;
