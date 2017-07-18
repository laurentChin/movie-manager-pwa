import React, {Component} from 'react';

import './Format.css';

class Format extends Component {
  render () {
    return (
      <span className="format">{this.props.label}</span>
    )
  }
}

export default Format;