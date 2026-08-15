import React from "react";

function onChangeHandler(reduxFormOnChangeHandler) {
  return (event) => {
    const file = event.target.files[0];
    reduxFormOnChangeHandler(file);
  };
}

function CSVInput({ input }) {
  // eslint-disable-next-line no-unused-vars
  const { value, ...inputWithoutValue } = input;
  return (
    <input
      type="file"
      {...inputWithoutValue}
      onChange={onChangeHandler(input.onChange)}
      accept=".csv"
    />
  );
}

export default CSVInput;
