import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieForm from "./Form";
import { withAuth } from "../Auth";
import { createMovie } from "./Actions";

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(formData) {
    this.props.dispatch(createMovie(formData));
  }
  render() {
    return (<MovieForm onSubmit={this.submitHandler}/>)
  }
}

export default connect()(withAuth(FormPage));
