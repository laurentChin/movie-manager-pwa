import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import './Home.css';

import { fetchMovies } from './Movie/Actions';
import MovieList from "./Movie/List/MovieList";
import { withAuth } from "./Auth";

class Home extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  }

  render() {
    const movies = this.props.movies || [];
    return (
      <div className="home-container">
        <span className="movie-count">You own {movies.length} movies</span>
        {!this.props.isFetching
        && movies.length > 0
        && <MovieList movies={movies} />}
        <Link to="/movies/create" className="add-movie-btn">Add</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {isFetching, items: movies} = state.movies || {
    isFetching: true,
    movies: []
  };

  return {
    isFetching,
    movies
  }
}

export default connect(mapStateToProps)(withAuth(Home));
