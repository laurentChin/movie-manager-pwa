import React, { Component } from 'react';
import { connect } from 'react-redux';

import './FlashMessage.css';

class FlashMessage extends Component {
  render() {
    const { message, status } = this.props;

    return (<div className="flash-message-container" status={status}>
      <p>{message}</p>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.flash
  }
}

export default connect(mapStateToProps)(FlashMessage);
