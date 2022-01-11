import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { formValueSelector } from "redux-form";
import { useParams } from "react-router-dom";

import { Form } from "Movie/components/Form";
import { update, search } from "./Actions";
import { fetchFormats } from "../Format";
import { fetchMovie } from "./graphql/client";
import { selectMovies } from "./Movie.selectors";

const UpdatePage = ({ update, formats, fetchFormats, ...props }) => {
  const params = useParams();
  const movies = useSelector(selectMovies);
  const [movie, setMovie] = useState(
    movies.find((movie) => movie.id === params.id)
  );

  useEffect(() => {
    if (formats.length === 0) {
      fetchFormats();
    }

    if (!movie) {
      fetchMovie(parseInt(params.id)).then((response) => setMovie(response));
    }
  }, [params, movie, formats, fetchFormats]);

  return (
    <Form
      onSubmit={update}
      initialValues={movie}
      formats={formats}
      isUpdate
      {...props}
    />
  );
};

const mapStateToProps = ({ format, movies, ...state }) => {
  const { isFetching: isFetchingFormat, formats } = format;
  const { proposals } = movies;

  return {
    isFetchingFormat,
    formats,
    title: formValueSelector("movie")(state, "title"),
    proposals,
  };
};

const mapDispatchToProps = {
  fetchFormats,
  update,
  search,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage);
