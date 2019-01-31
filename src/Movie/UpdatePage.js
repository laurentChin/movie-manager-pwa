import React, { Component } from "react";
import { connect } from "react-redux";

import { Form } from "./Form";
import { withAuth } from "../Auth";
import { updateMovie } from "./Actions";
import { fetchFormats } from "../Format";

class UpdatePage extends Component {
  constructor(props) {
    super(props);
    this.backToList = this.backToList.bind(this);
  }

  componentDidMount() {
    this.props.fetchFormats();
  }

  backToList() {
    this.props.history.push("/");
  }

  render() {
    const { formats, movie, updateMovie } = this.props;
    return (
      <Form
        onSubmit={updateMovie}
        formats={formats}
        initialValues={movie}
        backToList={this.backToList}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isFetching: isFetchingFormat, formats } = state.format;
  const { selected } = state.movies;

  return {
    isFetchingFormat,
    formats,
    movie: selected
  };
};

const mapDispatchToProps = {
  fetchFormats,
  updateMovie
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(UpdatePage));
