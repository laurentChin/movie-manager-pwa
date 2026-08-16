import React, { useState } from "react";

import "./CoverInput.css";

const assetsUrl = process.env.REACT_APP_API_URL;

export const CoverInput = ({ value, onChange }) => {
  const [previewSource, setPreviewSource] = useState(null);

  const remoteSource = value
    ? /^http[s]?:\/\//.test(value)
      ? value
      : `${assetsUrl}/uploads/${value}`
    : "";
  const source = previewSource || remoteSource;

  const showPreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = (event) => {
      setPreviewSource(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="cover-input">
      <div className="cover-input__preview">
        {source ? (
          <img src={source} alt="" />
        ) : (
          <span className="cover-input__placeholder">No poster</span>
        )}
      </div>
      <label className="cover-input__button">
        Choose a poster
        <input
          type="file"
          accept="image/*"
          className="cover-input__file"
          onChange={(event) => {
            const file = event.target.files[0];
            onChange(file);
            showPreview(file);
          }}
        />
      </label>
    </div>
  );
};
