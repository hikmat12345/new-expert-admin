//libs
import React from "react";

//src

//scss
import "./FAEButton.scss";

const FAEButton = ({
  primary,
  children,
  className = "",
  loading,
  loaderProps,
  ...rest
}) => {
  return (
    <>
      <button
        className={`fae-button ${primary && "primary-fae-button"} ${className}`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default FAEButton;
