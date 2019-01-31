import React, { Component } from "react";

import "./MovieList.css";

import { Movie } from "../containers";

class MovieList extends Component {
  render() {
    return (
      <div className="movie-list">
        {this.props.movies.map(movie => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
    );
  }
}

export default MovieList;
