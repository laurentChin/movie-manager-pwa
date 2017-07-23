import React, {Component} from "react";

import './MovieList.css';

import { Movie } from '../';

class MovieList extends Component {
  render() {
    return (
      <div className="movie-list">
        {this.props.movies.map((movie) => {
          return <Movie key={movie.id} movie={movie}></Movie>
        })}
      </div>
    )
  }
}

export default MovieList;