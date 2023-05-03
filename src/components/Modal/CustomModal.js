import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomModal(props) {
  const handleClose = () => {
    setOpen(false);
  };
  const {
    open,
    setOpen,
    modalTitle,
    agreedButtonName,
    declineButtonName,
    handleAgreedButtonClick = () => {},
    agreedButtonColor = "#539165",
    declineButtonColor = "red",
    showAgreedButton = true,
    showDeclineButton = true,
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>

        <DialogActions>
          {showDeclineButton && (
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                color: declineButtonColor,
                borderColor: declineButtonColor,
                "&:hover": {
                  color: declineButtonColor,
                  borderColor: declineButtonColor,
                  background: "none",
                },
              }}
            >
              {declineButtonName}
            </Button>
          )}
          {showAgreedButton && (
            <Button
              onClick={() => {
                handleClose();
                handleAgreedButtonClick();
              }}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: agreedButtonColor,
                "&:hover": { background: agreedButtonColor },
              }}
            >
              {agreedButtonName}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
