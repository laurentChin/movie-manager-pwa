import React from "react";

import "./Image.css";

const Image = ({ src, alt, isVisible }) => {
  const original = src;
  const medium = original.replace(/(.[a-z0-9]{3,4})$/, "-medium$1");
  const small = original.replace(/(.[a-z0-9]{3,4})$/, "-small$1");

  return isVisible ? (
    <picture>
      <source srcSet={original} media="(min-width: 980px)" />
      <source srcSet={medium} media="(min-width: 420px)" />
      <img src={small} alt={alt} />
    </picture>
  ) : (
    <div className="picture-shadow-container">
      <div className="picture-shadow" />
    </div>
  );
};

export default Image;
