import React, { Component } from "react";
import { connect } from "react-redux";

import { Form } from "./Form";
import { withAuth } from "../Auth";
import { fetchMovie, updateMovie } from "./Actions";
import { fetchFormats } from "../Format";

class UpdatePage extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.backToList = this.backToList.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMovie(this.props.match.params.id)).then(() => {
      this.props.dispatch(fetchFormats());
    });
  }

  submitHandler(formData) {
    this.props.dispatch(updateMovie(formData.id, formData)).then();
  }

  backToList() {
    this.props.history.push("/");
  }

  render() {
    const { formats, movie } = this.props;
    return (
      <Form
        onSubmit={this.submitHandler}
        formats={formats}
        initialValues={movie}
        backToList={this.backToList}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isFetching: isFetchingFormat, formats } = state.format;
  const { isFetching: isFetchingMovie, movie } = state.movies;

  return {
    isFetchingFormat,
    isFetchingMovie,
    formats,
    movie
  };
};

export default connect(mapStateToProps)(withAuth(UpdatePage));
