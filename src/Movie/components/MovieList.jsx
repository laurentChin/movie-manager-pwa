import React, { useCallback, useEffect, useState } from "react";
import "./MovieList.css";

import { Movie } from "Movie/components/Movie";

let timeoutID = null;

export const MovieList = ({ movies }) => {
  const bottomBoundary = window.innerHeight;
  const [moviesInViewport, setMoviesInViewport] = useState([]);

  const toggleImages = useCallback(() => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      setMoviesInViewport(
        Array.from(document.querySelectorAll("[data-item-id]")).reduce(
          (acc, element) => {
            const { top, bottom } = element.getBoundingClientRect();
            if (bottom > 0 && top < bottomBoundary) {
              acc = [...acc, element.dataset.itemId];
            }

            return acc;
          },
          []
        )
      );
    }, 250);
  }, [setMoviesInViewport, bottomBoundary]);

  useEffect(() => {
    toggleImages();
    window.addEventListener("scroll", toggleImages);

    if (window.sessionStorage.getItem("scrollPos")) {
      window.scrollTo(0, parseInt(window.sessionStorage.getItem("scrollPos")));
      window.sessionStorage.removeItem("scrollPos");
    }

    return () => {
      window.removeEventListener("scroll", toggleImages);
    };
  }, [toggleImages]);

  return (
    <div className="movie-list">
      {movies.map((movie) => {
        return (
          <Movie
            key={movie.id}
            movie={movie}
            showImage={moviesInViewport.includes(movie.id)}
          />
        );
      })}
    </div>
  );
};
