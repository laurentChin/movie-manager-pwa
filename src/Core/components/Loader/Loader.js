import React from "react";
import { useSelector } from "react-redux";

import "./Loader.css";
import { selectLoading } from "Core/selectors";

export const Loader = () => {
  const loading = useSelector(selectLoading);
  let className = "loader-overlay";
  if (loading) {
    className = `${className} ${className}--visible`;
  }

  return (
    <div className={className}>
      <div className="loader-animation">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};
