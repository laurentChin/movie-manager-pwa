import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";

import { fetch as fetchMovies } from "./Movie/Actions";
import { fetchUser } from "./User/actions";
import { fetch as fetchLogs } from "./Log/actions";
import MovieList from "./Movie/List/MovieList";
import SearchBox from "./Search/container/SearchBox";

const Home = ({
  movies,
  offset,
  isFetching,
  fetchMovies,
  hasMoreToFetch,
  count,
  matches,
  jwt,
  fetchUser,
  fetchLogs,
  scrollPosition
}) => {
  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    fetchUser();
    if (movies.length === 0 && count > 0) {
      fetchMovies(0, count);
    }

    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }, [jwt, count, movies, scrollPosition]);

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
        {matches.length > 0 && <MovieList movies={matches} />}
      </div>
      {!isFetching && movies.length > 0 && matches.length === 0 && (
        <MovieList movies={movies} />
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
    scrollPosition
  };
};

const mapDispatchToProps = {
  fetchMovies,
  fetchUser,
  fetchLogs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
