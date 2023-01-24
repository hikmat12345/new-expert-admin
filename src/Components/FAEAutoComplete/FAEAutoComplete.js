//libs
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

//src
// import { FAEContainer } from "../FAEContainer/FAEContainer";
// import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";
// import { FAEText } from "../FAEText/FAEText";

//scss
import "./FAEAutoComplete.scss";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const FAEAutoComplete = ({
  placeholder = "placeholder",
  className = "",
  justify,
  align,
  primary,
  shadowBoxProps,
  renderOption,
  values = [],
  value = "",
  label,
  getSelectedValue = () => {},
  isRequired = false,
  ...rest
}) => {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState(
    value !== "" ? value : { label: "" }
  );

  const handleChange = (e, valueObj) => {
    // setSelectedValue(valueObj === null ? { label: "" } : valueObj);
    getSelectedValue(valueObj === null ? "" : valueObj.value);
  }

  return (
    <div className="auto-complete-container">
      <div className="auto-complete-wrapper">
        {/* {cons} */}
        <Autocomplete
          className={className}
          id="country-select-demo"
          options={values}
          classes={{
            option: classes.option,
          }}
          value={value}
          autoHighlight
          getOptionLabel={(option) => option.label || ""}
          onChange={handleChange}
          renderOption={renderOption}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              selectedValue = {value}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
              {...rest}
            />
          )}
        />
      </div>
    </div>
  );
};

export default FAEAutoComplete;
