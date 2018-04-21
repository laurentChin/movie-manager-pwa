import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieForm from "./Form";
import { withAuth } from "../Auth";
import { createMovie } from "./Actions";
import { fetchFormats } from '../Format';

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchFormats());
  }

  submitHandler(formData) {
    formData.formats = formData.formats
      .map((value, key) => {
        return key;
      })
      .filter((value) => {
        return value;
      });
    this.props.dispatch(createMovie(formData));
  }
  render() {
    return (<MovieForm onSubmit={this.submitHandler} formats={this.props.formats}/>)
  }
}

const mapStateToProps = (state) => {
  const { isFetching, formats } = state.format;

  return {
    isFetching,
    formats
  }
}

export default connect(mapStateToProps)(withAuth(FormPage));
