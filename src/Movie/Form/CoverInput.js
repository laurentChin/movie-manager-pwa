import React, { Component } from "react";

import "./CoverInput.css";

const assetsUrl = process.env.REACT_APP_ASSETS_URL;

class CoverInput extends Component {
  constructor(props) {
    super(props);
    this.poster = React.createRef();
  }

  onFileChangeHandler(reduxFormOnChangeHandler) {
    return event => {
      const file = event.target.files[0];
      reduxFormOnChangeHandler(file);

      const reader = new FileReader();
      reader.onloadend = event => {
        this.poster.current.src = event.target.result;
      };

      reader.readAsDataURL(file);
    };
  }

  render() {
    const { input } = this.props;
    const poster = input.value;
    const { value, ...inputProps } = input;
    const src = /^http[s]?:\/\//.test(value) ? value : `${assetsUrl}/${poster}`;
    return (
      <div className="cover-input-container">
        <img src={src} alt="movie_poster" ref={this.poster} />
        <input
          type="file"
          {...inputProps}
          onChange={this.onFileChangeHandler(input.onChange)}
        />
      </div>
    );
  }
}

export default CoverInput;
