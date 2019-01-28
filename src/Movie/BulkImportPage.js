import React, { Component } from "react";

import { connect } from "react-redux";

import { withAuth } from "../Auth";
import { BulkImportForm } from "./Form";
import { bulkImport } from "./Actions";

class BulkImportPage extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(formData) {
    console.log(formData);
    this.props.dispatch(bulkImport(formData.csv)).then(() => {
      this.props.history.push("/");
    });
  }
  render() {
    return <BulkImportForm onSubmit={this.submitHandler} />;
  }
}

const mapStateToProps = state => {
  const { isProcessingImport, importDone } = state.movies;

  return {
    isProcessingImport,
    importDone
  };
};

export default connect(mapStateToProps)(withAuth(BulkImportPage));
