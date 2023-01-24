//libs
import React, { useState, Children } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

//src
// import { FAEContainer } from "../FAEContainer/FAEContainer";
// import { FAEText } from "../FAEText/FAEText";
// import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";

//scss
import "./FAERadioGroup.scss";

const FAERadioGroup = ({
  justify,
  align,
  className = "",
  label = "",
  values = [],
  direction = "horizontal",
  radioLabelProps,
  radioComponentsProps,
  shadowBoxProps,
  primary,
  value = "",
  renderOptions,
  getSelectedValue = () => {},
  isRequired = false,
  ...rest
}) => {
  const [initialvalue, setInitialValue] = useState(value);
  const boxDirection = direction === "horizontal" ? "horizontal-radio" : "";

  const handleChange = (event) => {
    // setInitialValue(event.target.value);
    getSelectedValue(event.target.value);
  };

  return (
    <>
      <p>{label}</p>
      <RadioGroup
        value={value}
        onChange={handleChange}
        className={`fae--radio-group ${boxDirection} ${className}`}
      >
        {Children.toArray(
          values.map((valueObj) => {
            const { value, label } = valueObj;
            return (
              <FormControlLabel
                {...radioLabelProps}
                value={value}
                control={<Radio {...rest} />}
                label={renderOptions ? renderOptions(valueObj) : <p>{label}</p>}
              />
            );
          })
        )}
      </RadioGroup>
    </>
  );
};

export default FAERadioGroup;
