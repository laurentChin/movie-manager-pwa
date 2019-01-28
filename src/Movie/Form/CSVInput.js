import React, { Component } from "react";

class CSVInput extends Component {
  onChangeHandler(reduxFormOnChangeHandler) {
    return event => {
      const file = event.target.files[0];
      reduxFormOnChangeHandler(file);
    };
  }

  render() {
    const { input } = this.props;
    delete input.value;
    return (
      <input
        type="file"
        {...input}
        onChange={this.onChangeHandler(input.onChange)}
        accept=".csv"
      />
    );
  }
}

export default CSVInput;
