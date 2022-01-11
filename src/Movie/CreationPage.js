import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Form } from "Movie/components/Form";
import { create, search } from "./Actions";
import { fetchFormats } from "../Format";
import { formValueSelector } from "redux-form";

const CreationPage = ({ create, formats, fetchFormats, ...props }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (formats.length === 0) {
      fetchFormats();
    }
  });

  const handleSubmit = async (movie) => {
    const { id } = await create(movie);
    navigate(`/movies/${id}/update`);
  };

  return <Form onSubmit={handleSubmit} formats={formats} {...props} />;
};

const mapStateToProps = ({ format, movies, ...state }) => {
  const { isFetching, formats } = format;
  const { isProcessingCreation, proposals } = movies;

  return {
    isFetching,
    formats,
    isProcessingCreation,
    title: formValueSelector("movie")(state, "title"),
    proposals,
  };
};

const mapDispatchToProps = {
  fetchFormats,
  create,
  search,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreationPage);
