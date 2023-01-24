//libs
import React, { useState, Children, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

//src
// import { FAEContainer } from "../FAEContainer/FAEContainer";
// import { FAEText } from "../FAEText/FAEText";
// import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";

//scss
import "./FAECheckBoxGroup.scss";

const FAECheckBoxGroup = ({
  justify,
  align,
  className = "",
  label = "",
  values = [],
  direction = "",
  checkboxLabelProps,
  checkboxComponentsProps,
  shadowBoxProps,
  primary,
  renderOptions,
  getSelectedValues = () => {},
  error = () => {},
  errorMessage,
  isRequired = false,
  ...rest
}) => {
  const [checkedValues, setCheckedValues] = useState([]);
  const boxDirection = direction === "horizontal" ? "horizontal-check-box" : "";

  const handleChange = (event) => {
    checkedValues.some(
      (checkedValueObj) => checkedValueObj.value === event.value
    )
      ? setCheckedValues(
          checkedValues.filter(
            (checkedValueObj) => checkedValueObj.value !== event.value
          )
        )
      : setCheckedValues([...checkedValues, event]);
  };

  useEffect(() => {
    getSelectedValues(checkedValues);
  }, [checkedValues, getSelectedValues]);

  return (
    <>
      <div className="fae--check-box-group-container" style={{ width: "100%" }}>
        <p>{label}</p>
        <div className={`fae--check-box-group ${boxDirection} ${className}`}>
          {Children.toArray(
            values.map((valueObj) => {
              const { value, label, count, users } = valueObj;
              return (
                <FormControlLabel
                  {...checkboxLabelProps}
                  value={value}
                  control={
                    <Checkbox
                      onChange={() => handleChange(valueObj)}
                      checked={checkedValues.some(
                        (checkedValueObj) => checkedValueObj.value === value
                      )}
                      {...rest}
                    />
                  }
                  label={
                    renderOptions ? (
                      renderOptions(valueObj)
                    ) : (
                      <>
                        <p>{label}</p>
                        <p>{count}</p>
                      </>
                    )
                  }
                />
              );
            })
          )}
          {/* {error && error(checkedValues) && (
                <FAEText paragraph className="error">
                  {errorMessage}
                </FAEText>
              )} */}
        </div>
      </div>
    </>
  );
};

export default FAECheckBoxGroup;
