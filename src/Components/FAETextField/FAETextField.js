//libs
import { TextField } from "@material-ui/core";
import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";

//scr
// import { FAEContainer } from "../FAEContainer/FAEContainer";
// import { FAEText } from "../FAEText/FAEText";
// import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";

//scss
import "./FAETextField.scss";

export const FAETextField = ({
  justify,
  align,
  className = "",
  label,
  shadowBoxProps,
  primary,
  type,
  placeholder,
  value = "",
  getValue = () => {},
  error = () => {},
  errorMessage,
  isRequired = false,
  ...rest
}) => {
  const [initialValue, setInitialValue] = useState(value);

  const handleChange = (e) => {
    // setInitialValue(e.target.value);
    getValue(e.target.value);
  };

  return (
    <div className="text-field-container">
      <div className="text-field-wrapper">
        <TextField
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          className="text-field-input"
          {...rest}
        />
      </div>
    </div>
  );
};
