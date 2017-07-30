import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from './Movie/Actions';

import './App.css';

import { MovieList } from './Movie';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  }

  render() {
    return (
      <div className="App">
        {!this.props.isFetching
          && this.props.movies.length > 0
          && <MovieList movies={this.props.movies} />}
      </div>
    );
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

export default connect(mapStateToProps)(App);
