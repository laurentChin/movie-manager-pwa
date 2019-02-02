import React, { Component } from "react";

import "./Format.css";

const baseUrl = process.env.REACT_APP_API_URL;

class Format extends Component {
  render() {
    return (
      <img
        src={`${baseUrl}/assets/${this.props.logo}`}
        className="format"
        alt={this.props.name}
      />
    );
  }
}

export default Format;
