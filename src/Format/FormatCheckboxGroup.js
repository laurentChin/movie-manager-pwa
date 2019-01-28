import React, { Component } from "react";

class FormatCheckboxGroup extends Component {
  formatMap = new Map();
  valueMap = new Map();

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const { value, checked } = event.target;
    if (checked) {
      this.valueMap.set(value, this.formatMap.get(value));
    } else {
      this.valueMap.delete(value);
    }

    this.onChange([...this.valueMap.values()]);
  }

  render() {
    const { input, formats } = this.props;
    const value = input.value || [];
    this.onChange = input.onChange;

    formats.forEach(format => {
      this.formatMap.set(`${format.id}`, format);
    });

    value.forEach(format => {
      this.valueMap.set(`${format.id}`, format);
    });

    return (
      <div>
        {formats.map(format => (
          <label key={format.id}>
            {this.valueMap.has(`${format.id}`) ? (
              <input
                name={`formats[${format.id}]`}
                type="checkbox"
                defaultChecked
                onChange={this.changeHandler}
                value={format.id}
              />
            ) : (
              <input
                name={`formats[${format.id}]`}
                type="checkbox"
                onChange={this.changeHandler}
                value={format.id}
              />
            )}
            <span>{format.name}</span>
          </label>
        ))}
      </div>
    );
  }
}

export default FormatCheckboxGroup;
