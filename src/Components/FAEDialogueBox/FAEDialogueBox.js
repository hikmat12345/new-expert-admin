//libs
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

//src

//scss
import "./FAEDialogueBox.scss";
import { Children } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FAEDialogueBox = ({
  buttons = [],
  title = "",
  content = "",
  open = false,
  ...rest
}) => {
  const [openDialogue, setOpenDialogue] = React.useState(open);

  useEffect(() => {
    setOpenDialogue(open);
  }, [open]);

  return (
    <>
      <Dialog
        open={openDialogue}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        {...rest}
      >
        <DialogTitle id="alert-dialog-slide-title">
          <p>{title}</p>
        </DialogTitle>
        <DialogContent>
          <p
            id="alert-dialog-slide-description"
            // style={{ textAlign: "center" }}
          >
            {content}
          </p>
        </DialogContent>
        <DialogActions>
          {Children.toArray(
            buttons.map((button) => {
              const { label, onClick } = button;
              return (
                <Button color="primary" onClick={onClick}>
                  {label}
                </Button>
              );
            })
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FAEDialogueBox;
