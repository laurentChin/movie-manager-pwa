import React, { Component } from "react";
import { FormattedDate } from "react-intl";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Movie.css";

import { FormatList } from "../../Format";
import { Duration } from "../../Duration";
import { deleteMovie, fetchMovies } from "../Actions";
import { Image } from "../../core";

const assetsUrl = process.env.REACT_APP_ASSETS_URL;

class Movie extends Component {
  constructor(props) {
    super(props);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler() {
    const { movie, dispatch } = this.props;
    const confirm = window.confirm(
      `Are you sure want to delete '${movie.title}' (${movie.director} - ${
        movie.releaseDate
      }) ?`
    );
    if (confirm) {
      dispatch(deleteMovie(movie.id, movie.title)).then(() => {
        dispatch(fetchMovies());
      });
    }
  }
  render() {
    let movie = this.props.movie;
    return (
      <div className="movie-item">
        <Image src={`${assetsUrl}/${movie.poster}`} alt={movie.title} />
        <section className="movie-item__content">
          <h3>{movie.title}</h3>
          {movie.originalTitle && <small>{movie.originalTitle}</small>}
          {movie.director && <small>{movie.director}</small>}
          <section className="infos">
            {movie.duration && (
              <Duration className="duration" value={movie.duration} />
            )}
            <FormattedDate
              className="theater-release-Date"
              value={new Date(movie.releaseDate)}
            />
            {movie.formats && <FormatList formats={movie.formats} />}
          </section>
          <p>{movie.synopsis}</p>
        </section>
        <section className="options">
          <Link to={`/movies/${movie.id}/update`}>Edit</Link>
          <button onClick={this.deleteHandler}>Delete</button>
        </section>
      </div>
    );
  }
}

export default connect()(Movie);
