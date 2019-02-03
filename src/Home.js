import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";

import { fetchMovies } from "./Movie/Actions";
import MovieList from "./Movie/List/MovieList";
import { withAuth } from "./Auth";

class Home extends Component {
  componentDidMount() {
    const { fetchMovies, movies } = this.props;
    if (movies.length === 0) {
      fetchMovies(0);
    }
  }

  render() {
    const {
      movies,
      offset,
      isFetching,
      fetchMovies,
      hasMoreToFetch
    } = this.props;
    return (
      <div className="home-container">
        <span className="movie-count">Count: {movies.length}</span>
        {!isFetching && movies.length > 0 && <MovieList movies={movies} />}
        <Link to="/movies/create" className="add-movie-btn">
          +
        </Link>
        {hasMoreToFetch && (
          <button className="fetch-more" onClick={() => fetchMovies(offset)}>
            More...
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isFetching, items: movies, offset, hasMoreToFetch } = state.movies;

  return {
    isFetching,
    movies,
    offset,
    hasMoreToFetch
  };
};

const mapDispatchToProps = {
  fetchMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Home));
