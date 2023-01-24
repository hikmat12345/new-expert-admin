import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import "./SnackBar.scss";
const SnackBar = ({
  //   handleClose,
  message,
  vertical,
  horizontal,
  duration = 3000,
  variant,
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Alert severity={variant}>{message}</Alert>
    </>
  );
};

export default SnackBar;
