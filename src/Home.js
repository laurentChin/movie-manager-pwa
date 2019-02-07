import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";

import { fetchMovies } from "./Movie/Actions";
import { fetchUser } from "./User/actions";
import MovieList from "./Movie/List/MovieList";
import { withAuth } from "./Auth";
import SearchBox from "./Search/container/SearchBox";

class Home extends Component {
  componentDidMount() {
    const { fetchMovies, movies, fetchUser } = this.props;
    if (movies.length === 0) {
      fetchMovies(0);
    }
    fetchUser();
  }

  render() {
    const {
      movies,
      offset,
      isFetching,
      fetchMovies,
      hasMoreToFetch,
      count,
      matches
    } = this.props;
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
        {hasMoreToFetch && (
          <button className="fetch-more" onClick={() => fetchMovies(offset)}>
            More...
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ movies, user, search }) => {
  const { isFetching, items, offset, hasMoreToFetch } = movies;
  const { count } = user;
  const { matches } = search;

  return {
    isFetching,
    movies: items,
    offset,
    hasMoreToFetch,
    count,
    matches
  };
};

const mapDispatchToProps = {
  fetchMovies,
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Home));
