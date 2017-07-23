import React, { Component } from 'react';

import './FormatList.css';

import { Format } from '../';

class FormatList extends Component {
  render() {
    console.log(this.props.formats);
    return (
      <div className="format-list">
        {this.props.formats.map((format) => {
          return <Format key={format} label={format}></Format>
        })}
      </div>
    )
  }
}

export default FormatList;