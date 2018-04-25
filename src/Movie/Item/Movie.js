import React, {Component} from "react";
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

import './Movie.css';

import {FormatList} from '../../Format';
import {Duration} from '../../Duration';

class Movie extends Component {
  render() {
    let movie = this.props.movie;
    return (
      <div className="movie-item">
        {movie.cover && <img src={movie.cover} alt={movie.title}/>}
        <section className="movie-item__content">
          <h3>{movie.title}</h3>
          {movie.originalTitle && <small>{movie.originalTitle}</small>}
          <section className="infos">
            {movie.duration && <Duration className="duration" value={movie.duration} />}
            <FormattedDate className="theater-release-Date" value={new Date(movie.releaseDate)}/>
            {movie.formats && <FormatList formats={movie.formats}/>}
          </section>
          <p>{movie.synopsis}</p>
          <Link to={`/movies/${movie.id}/update`}>Edit</Link>
        </section>
      </div>
    )
  }
}

export default Movie;
