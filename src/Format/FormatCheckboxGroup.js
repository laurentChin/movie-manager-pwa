import React, { useState } from "react";

import "./FormatCheckboxGroup.css";

export const FormatCheckboxGroup = ({ initialValues, formats, onChange }) => {
  const [values, setValues] = useState(initialValues || []);
  const [syncedInitialValues, setSyncedInitialValues] = useState(initialValues);

  if (initialValues && initialValues !== syncedInitialValues) {
    setSyncedInitialValues(initialValues);
    setValues(initialValues);
  }

  const changeHandler = (event) => {
    const { value: selection } = event.target;
    let finalValues;
    if (!values.find((value) => value.id === selection)) {
      finalValues = [
        ...values,
        formats.find((value) => value.id === selection),
      ];
    } else {
      finalValues = values.filter((value) => value.id !== selection);
    }
    onChange(finalValues);
    setValues(finalValues);
  };

  return (
    <div className="format-checkbox-group">
      {formats.map((format) => (
        <label key={format.id}>
          <input
            name={`formats[${format.id}]`}
            type="checkbox"
            checked={!!values.find((value) => value.id === format.id)}
            onChange={changeHandler}
            value={format.id}
          />
          <span>{format.name}</span>
        </label>
      ))}
    </div>
  );
};
