import React, {Component} from "react";

import './MovieList.css';

import {MovieItem} from '../MovieItem/index';

class MovieList extends Component {
  render() {
    return (
      <div className="movie-list">
        {this.props.movies.map((movie) => {
          return <MovieItem key={movie.id} movie={movie}></MovieItem>
        })}
      </div>
    )
  }
}

export default MovieList;