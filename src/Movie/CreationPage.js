import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from "./Form";
import { withAuth } from "../Auth";
import { createMovie } from "./Actions";
import { fetchFormats } from '../Format';

class CreationPage extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchFormats());
  }

  submitHandler(formData) {
    this.props.dispatch(createMovie(formData)).then(() => {
      this.props.history.push('/');
    });
  }
  render() {
    return (
      <Form onSubmit={this.submitHandler} formats={this.props.formats}/>
      )
  }
}

const mapStateToProps = (state) => {
  const { isFetching, formats } = state.format;
  const { isProcessingCreation } = state.movies;

  return {
    isFetching,
    formats,
    isProcessingCreation
  }
}

export default connect(mapStateToProps)(withAuth(CreationPage));
