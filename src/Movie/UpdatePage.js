import React, { useEffect } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { push } from "connected-react-router";

import { Form } from "./Form";
import { withAuth } from "../Auth";
import { update, search, resetProposalList, selectProposal } from "./Actions";
import { fetchFormats } from "../Format";

const UpdatePage = ({ movie, update, formats, fetchFormats, ...props }) => {
  useEffect(() => {
    if (formats.length === 0) {
      fetchFormats();
    }
  });

  return (
    <Form
      onSubmit={update}
      initialValues={movie}
      formats={formats}
      {...props}
    />
  );
};

const mapStateToProps = ({ format, movies, ...state }) => {
  const { isFetching: isFetchingFormat, formats } = format;
  const { selected, proposals } = movies;

  return {
    isFetchingFormat,
    formats,
    movie: selected,
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
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(UpdatePage));
