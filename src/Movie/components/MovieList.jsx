import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import "./MovieList.css";

import { Movie } from "Movie/components/Movie";
import { MovieDialog } from "Movie/components/MovieDialog";
import { useVirtualizedGrid } from "Movie/useVirtualizedGrid";

const assetsUrl = process.env.REACT_APP_API_URL;

export const MovieList = ({ movies }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    gridRef,
    mountRange,
    visibleRange,
    topSpacerHeight,
    bottomSpacerHeight,
  } = useVirtualizedGrid(movies.length);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef();

  useEffect(() => {
    if (window.sessionStorage.getItem("scrollPos")) {
      window.scrollTo(0, parseInt(window.sessionStorage.getItem("scrollPos")));
      window.sessionStorage.removeItem("scrollPos");
    }
  }, []);

  const selectMovie = async (movie) => {
    // Make sure the dialog's poster is already decoded before the
    // transition captures it, otherwise it briefly snapshots empty.
    const preload = new window.Image();
    preload.src = `${assetsUrl}/uploads/${movie.poster}`;
    await (preload.decode ? preload.decode().catch(() => {}) : null);

    flushSync(() => setSelectedMovie(movie));

    const openDialog = () => {
      dialogRef.current.showModal();
      flushSync(() => setIsDialogOpen(true));
    };

    if (document.startViewTransition) {
      document.startViewTransition(openDialog);
    } else {
      openDialog();
    }
  };

  useEffect(() => {
    // Travels through navigation state rather than sessionStorage:
    // this component never unmounts between the creation dialog
    // opening and closing (it's the grid visible behind it), so an
    // effect watching the Redux movie list would fire as soon as the
    // movie is created - before CreationPage got a chance to record
    // anything - and never get another chance to notice it later.
    const openMovieId = location.state?.openMovieId;
    if (!openMovieId) {
      return;
    }

    const movieToOpen = movies.find((movie) => movie.id === openMovieId);
    if (movieToOpen) {
      selectMovie(movieToOpen);
    }
    navigate(location.pathname, { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, movies]);

  const closeDialog = () => {
    const applyClosedState = () => {
      flushSync(() => setIsDialogOpen(false));
      dialogRef.current.close();
    };

    if (document.startViewTransition) {
      document
        .startViewTransition(applyClosedState)
        .finished.finally(() => setSelectedMovie(null));
    } else {
      applyClosedState();
      setSelectedMovie(null);
    }
  };

  return (
    <>
      <ul className="movie-list" ref={gridRef}>
        {topSpacerHeight > 0 && (
          <li
            className="movie-list__spacer"
            aria-hidden="true"
            style={{ "--spacer-height": `${topSpacerHeight}px` }}
          />
        )}
        {movies.slice(mountRange.start, mountRange.end).map((movie, i) => {
          const index = mountRange.start + i;
          return (
            <Movie
              key={movie.id}
              movie={movie}
              showImage={
                index >= visibleRange.start && index < visibleRange.end
              }
              isActive={selectedMovie?.id === movie.id}
              isDialogOpen={isDialogOpen}
              onSelect={() => selectMovie(movie)}
            />
          );
        })}
        {bottomSpacerHeight > 0 && (
          <li
            className="movie-list__spacer"
            aria-hidden="true"
            style={{ "--spacer-height": `${bottomSpacerHeight}px` }}
          />
        )}
      </ul>
      <MovieDialog
        dialogRef={dialogRef}
        movie={selectedMovie}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onMovieUpdated={setSelectedMovie}
      />
    </>
  );
};
