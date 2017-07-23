import React, {Component} from "react";

import './MovieItem.css';

import {FormatList} from '../FormatList';

class MovieItem extends Component {
  render() {
    let movie = this.props.movie;
    return (
      <div className="movie-item">
        <img src={movie.cover} alt={movie.title}/>
        <section className="movie-item__content">
          <h3>{movie.title}</h3>
          <small>{movie.originalTitle}</small>
          <section className="infos">
            <span className="duration">{movie.duration}</span>
            <span className="theater-release-Date">{movie.theaterReleaseDate}</span>
            <FormatList formats={movie.formats}/>
          </section>
          <p>{movie.synopsis}</p>
        </section>
      </div>
    )
  }
}

export default MovieItem;