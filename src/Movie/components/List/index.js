import React from "react";

import "./MovieList.css";

import { Movie } from "Movie/components/Movie";

const MovieList = ({ movies, offset, limit, paginate = null }) => {
  const previousOffset = offset - limit >= 0 ? offset - limit : -1;
  const nextOffset = offset + limit < movies.length ? offset + limit : null;

  return (
    <>
      {previousOffset >= 0 && paginate && (
        <button
          className="previous-btn"
          onClick={() => paginate(previousOffset)}
        >
          Previous
        </button>
      )}
      <div className="movie-list">
        {movies.slice(offset, offset + limit).map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
      {nextOffset && paginate && (
        <button
          className="next-btn"
          onClick={() => {
            window.scrollTo(0, 0);
            paginate(nextOffset);
          }}
        >
          Next
        </button>
      )}
    </>
  );
};

export default MovieList;
