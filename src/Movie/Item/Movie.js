import React, {Component} from "react";
import { FormattedDate } from 'react-intl';

import './Movie.css';

import {FormatList} from '../../Format';

class Movie extends Component {
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
            <FormattedDate className="theater-release-Date" value={new Date(movie.theaterReleaseDate * 1000)}/>
            <FormatList formats={movie.formats}/>
          </section>
          <p>{movie.synopsis}</p>
        </section>
      </div>
    )
  }
}

export default Movie;