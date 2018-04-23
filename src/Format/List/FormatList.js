import React, { Component } from 'react';

import './FormatList.css';

import { Format } from '../';

class FormatList extends Component {
  render() {
    return (
      <div className="format-list">
        {this.props.formats.map((format) => {
          return <Format key={format.id} label={format.name}></Format>
        })}
      </div>
    )
  }
}

export default FormatList;
