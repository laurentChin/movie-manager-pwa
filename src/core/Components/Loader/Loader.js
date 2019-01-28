import React, { Component } from "react";
import { connect } from "react-redux";

import "./Loader.css";

class Loader extends Component {
  render() {
    const { loading } = this.props;
    let className = "loader-overlay";
    if (loading) {
      className = `${className} ${className}--visible`;
    }

    return (
      <div className={className}>
        <div className="loader-animation">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loading } = state.loader;
  return {
    loading
  };
};

export default connect(mapStateToProps)(Loader);
