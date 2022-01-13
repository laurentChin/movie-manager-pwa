import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";

import { fetch as fetchMovies } from "./Movie/Actions";
import { fetchUser } from "./User/actions";
import { fetch as fetchLogs } from "./Log/actions";
import { MovieList } from "./Movie";
import { SearchBox } from "./Search/components/SearchBox";
import { selectLimit, selectOffset } from "./Movie/selectors";

const Home = ({
  movies,
  isFetching,
  fetchMovies,
  hasMoreToFetch,
  count,
  matches,
  jwt,
  fetchUser,
  fetchLogs,
  scrollPosition,
}) => {
  const offset = useSelector(selectOffset);
  const limit = useSelector(selectLimit);
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    fetchUser();
    if (movies.length === 0 && count > 0) {
      fetchMovies(0, count);
    }

    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }, [jwt, count, movies, scrollPosition, fetchMovies, fetchUser]);

  return (
    <div className="home-container">
      <div className="toolbox">
        <SearchBox />
        <span className="movie-count">Count: {count}</span>
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

const mapStateToProps = ({ movies, user, search, auth }) => {
  const { isFetching, items, offset, hasMoreToFetch, scrollPosition } = movies;
  const { count } = user;
  const { matches } = search;
  const { jwt } = auth;

  return {
    isFetching,
    movies: items,
    offset,
    hasMoreToFetch,
    count,
    matches,
    jwt,
    scrollPosition,
  };
};

const mapDispatchToProps = {
  fetchMovies,
  fetchUser,
  fetchLogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
