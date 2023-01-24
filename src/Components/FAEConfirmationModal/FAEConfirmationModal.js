//libs
 import React, { useState } from "react";
 import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
 

//scr
 

//scss
import "./FAEConfirmationModal.scss";
import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";

export const FAEConfirmationModal = ({
   open = false,
   onClick,
   onConfirm,
  ...rest
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>


        <FAEButton style = {{width: "90px", height: "40px", margin: "0px 5px 5px 0px", padding: "0px 3px 0px 0px"}} onClick={onClick}>
             <span>Cancel</span>
          </FAEButton>
          
              <FAEButton style = {{width: "90px", height: "40px", margin: "0px 5px 5px 5px", padding: "0px 3px 0px 0px"}} onClick={onConfirm}>
             <span>Yes</span>
          </FAEButton>

 
        </DialogActions>
      </Dialog>
    </div>
    
  );
};
