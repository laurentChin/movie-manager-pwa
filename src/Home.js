import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";

import { fetchMovies } from "./Movie/Actions";
import MovieList from "./Movie/List/MovieList";
import { withAuth } from "./Auth";

class Home extends Component {
  componentDidMount() {
    const { fetchMovies, offset } = this.props;
    fetchMovies(offset);
  }

  render() {
    const { movies, offset, isFetching, fetchMovies } = this.props;
    return (
      <div className="home-container">
        <span className="movie-count">Count: {movies.length}</span>
        {!isFetching && movies.length > 0 && <MovieList movies={movies} />}
        <Link to="/movies/create" className="add-movie-btn">
          +
        </Link>
        <button className="fetch-more" onClick={() => fetchMovies(offset)}>
          More...
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isFetching, items: movies, offset } = state.movies;

  return {
    isFetching,
    movies,
    offset
  };
};

const mapDispatchToProps = {
  fetchMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Home));
