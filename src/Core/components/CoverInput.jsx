import React, { useRef, useState } from "react";

import "./CoverInput.css";

const assetsUrl = process.env.REACT_APP_API_URL;

export const CoverInput = ({ value, onChange }) => {
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef();

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

  const clear = (event) => {
    event.preventDefault();
    setPreviewSource(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <span className="cover-input">
      <label className="cover-input__control">
        {source ? (
          <img src={source} alt="" />
        ) : (
          <span className="cover-input__placeholder">No poster</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="cover-input__file"
          onChange={(event) => {
            const file = event.target.files[0];
            if (!file) {
              return;
            }
            onChange(file);
            showPreview(file);
          }}
        />
      </label>
      {source && (
        <button
          type="button"
          className="cover-input__clear"
          onClick={clear}
          aria-label="Remove poster"
        >
          &times;
        </button>
      )}
    </span>
  );
};
