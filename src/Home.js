import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";

import { fetchMovies } from "./Movie/Actions";
import { fetchUser } from "./User/actions";
import MovieList from "./Movie/List/MovieList";
import { withAuth } from "./Auth";

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
      count
    } = this.props;
    return (
      <div className="home-container">
        <span className="movie-count">Count: {count}</span>
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

const mapStateToProps = ({ movies, user }) => {
  const { isFetching, items, offset, hasMoreToFetch } = movies;
  const { count } = user;

  return {
    isFetching,
    movies: items,
    offset,
    hasMoreToFetch,
    count
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
