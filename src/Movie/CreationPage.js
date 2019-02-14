import React, { useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { Form } from "./Form";
import { withAuth } from "../Auth";
import { create, search, resetProposalList, selectProposal } from "./Actions";
import { fetchFormats } from "../Format";
import { formValueSelector } from "redux-form";

const CreationPage = ({ create, formats, fetchFormats, ...props }) => {
  useEffect(() => {
    if (formats.length === 0) {
      fetchFormats();
    }
  });

  return <Form onSubmit={create} formats={formats} {...props} />;
};

const mapStateToProps = ({ format, movies, ...state }) => {
  const { isFetching, formats } = format;
  const { isProcessingCreation, proposals } = movies;

  return {
    isFetching,
    formats,
    isProcessingCreation,
    title: formValueSelector("movie")(state, "title"),
    proposals
  };
};

const mapDispatchToProps = {
  fetchFormats,
  create,
  search,
  resetProposalList,
  selectProposal,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(CreationPage));
