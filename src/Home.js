import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
        {!this.props.isFetching
        && movies.length > 0
        && <MovieList movies={movies} />}
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
