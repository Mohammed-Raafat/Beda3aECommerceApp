import React, { useState } from "react";

import { Button } from "semantic-ui-react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Toast = (props) => {
  const { message, close, buttonText, buttonOnClick } = props;
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          {buttonText && (
            <Button size="tiny" onClick={buttonOnClick} inverted compact>
              {buttonText}
            </Button>
          )}
          {close && (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </React.Fragment>
      }
    />
  );
};

export default Toast;