import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";

import { fetch as fetchMovies } from "Movie/Actions";
import { fetchUser } from "User/actions";
import { fetch as fetchLogs } from "Log/actions";
import { MovieList } from "Movie";
import { SearchBox } from "Search/components/SearchBox";
import {
  selectIsFetching,
  selectLimit,
  selectMovies,
  selectOffset,
} from "Movie/selectors";
import { selectMovieCount } from "User/selectors";
import { selectJwt } from "Auth/selectors";
import { selectMatches } from "Search/selectors";

export const Home = () => {
  const dispatch = useDispatch();
  const offset = useSelector(selectOffset);
  const limit = useSelector(selectLimit);
  const movies = useSelector(selectMovies);
  const isFetching = useSelector(selectIsFetching);
  const userMovieCount = useSelector(selectMovieCount);
  const jwt = useSelector(selectJwt);
  const matches = useSelector(selectMatches);

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUser());
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (jwt) {
      dispatch(fetchLogs());
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (jwt && movies.length === 0 && userMovieCount > 0) {
      dispatch(fetchMovies(0, userMovieCount));
    }
  }, [userMovieCount, movies, jwt, dispatch]);

  if (!jwt) return null;

  return (
    <div className="home-container">
      <div className="toolbox">
        <SearchBox />
        <span className="movie-count">Count: {userMovieCount}</span>
        <Link to="/movies/create" className="add-movie-btn">
          +
        </Link>
      </div>
      <div className="results">
        {matches.length > 0 && (
          <MovieList offset={0} limit={matches.length} movies={matches} />
        )}
      </div>
      {!isFetching && movies.length > 0 && matches.length === 0 && (
        <MovieList movies={movies} offset={offset} limit={limit} />
      )}
    </div>
  );
};
