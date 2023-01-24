// libs
import React from "react";

// src
import history from "../../history";

// scss
import "./Setting.scss";

const Setting = () => {
  return (
    <>
      <div
        className="setting-page-card"
        onClick={() => history.push({ pathname: "/balances" })}
      >
        Balances
      </div>
      <div
        className="setting-page-card"
        onClick={() => history.push({ pathname: "/audience" })}
      >
        Audience
      </div>
    </>
  );
};

export default Setting;
