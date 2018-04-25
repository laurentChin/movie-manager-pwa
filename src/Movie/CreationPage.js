import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieForm from "./Form";
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
    console.log(this.props);
  }

  submitHandler(formData) {
    this.props.dispatch(createMovie(formData)).then(() => {
      this.props.history.push('/');
    });
  }
  render() {
    return (
      <MovieForm onSubmit={this.submitHandler} formats={this.props.formats}/>
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
