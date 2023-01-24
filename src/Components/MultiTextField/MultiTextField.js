// libs
import React, { useState } from "react";
import { MenuItem, TextField } from "@material-ui/core";

// src

// scss
import "./MultiTextField.scss";

const MultiTextField = ({
  type,
  label,
  placeholder,
  inputFieldValue = "",
  getInputValue = () => {},
  selectOptions,
  selectPlaceholder = "Operator",
  selectLabel,
  selectFieldValue = "",
  getSelectValue = () => {},
  ...rest
}) => {
  //   const [inputValue, setInputValue] = useState(inputFieldValue);
  //   const [selectValue, setSelectValue] = useState(selectFieldValue);

  const handleInputChange = (e) => {
    // setInputValue(e.target.value);
    getInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    // setSelectValue(e.target.value);
    getSelectValue(e.target.value);
  };

  return (
    <div className="multi-text-field-container">
      <p>{label}</p>
      <div className="multi-text-field-wrapper">
        <TextField
          //   value={inputValue}
          value={inputFieldValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={type}
          className="multi-text-field-input"
          {...rest}
        />
        <span className="multi-text-field-seperator"></span>
        <TextField
          select
          label={selectFieldValue === "" ? "Operator" : ""}
          //   value={selectValue}
          value={selectFieldValue}
          onChange={handleSelectChange}
          InputLabelProps={{ shrink: false }}
          className="multi-text-field-select"
        >
          {selectOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default MultiTextField;
