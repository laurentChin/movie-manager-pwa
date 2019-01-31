import React, { Component } from "react";
import { connect } from "react-redux";

import { Form } from "./Form";
import { withAuth } from "../Auth";
import { createMovie } from "./Actions";
import { fetchFormats } from "../Format";

class CreationPage extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetchFormats();
  }

  submitHandler(formData) {
    this.props.createMovie(formData);
  }
  render() {
    return <Form onSubmit={this.submitHandler} formats={this.props.formats} />;
  }
}

const mapStateToProps = state => {
  const { isFetching, formats } = state.format;
  const { isProcessingCreation } = state.movies;

  return {
    isFetching,
    formats,
    isProcessingCreation
  };
};

const mapDispatchToProps = {
  fetchFormats,
  createMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(CreationPage));
