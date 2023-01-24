//libs
import React from "react";

//src

//scss
import "./FAEContainer.scss";

export const FAEContainer = ({
  children,
  justify = "center",
  align = "center",
  ...rest
}) => {
  const justifyElementPosition =
    justify === "flex-end"
      ? "justify-flex-end"
      : justify === "flex-start"
      ? "justify-flex-start"
      : "justify-center";
  const alignElementPosition =
    align === "flex-end"
      ? "align-flex-end"
      : align === "flex-start"
      ? "align-flex-start"
      : "align-center";
  return (
    <div
      className={`fae--main-container ${justifyElementPosition} ${alignElementPosition}`}
      {...rest}
    >
      {children}
    </div>
  );
};
