import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { useParams } from 'react-router-dom';

import { Form } from "./Form";
import { update, search, resetProposalList, selectProposal } from "./Actions";
import { fetchFormats } from "../Format";
import { fetchMovie } from "./graphql/client";

const UpdatePage = ({ update, formats, fetchFormats, ...props }) => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    if (formats.length === 0) {
      fetchFormats();
    }

    fetchMovie(parseInt(params.id)).then(response => setMovie(response));
  }, [params]);

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
    proposals
  };
};

const mapDispatchToProps = {
  fetchFormats,
  update,
  search,
  resetProposalList,
  selectProposal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePage);
