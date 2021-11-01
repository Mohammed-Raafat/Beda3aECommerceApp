import React from "react";

import { Box, Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    alignItems: "center",
    display: "flex",
  },
  display: {
    [theme.breakpoints.between("md", "lg")]: {
      display: "inline",
    },
  }
}));

const Rate = (props) => {
  const { rate, text, insideItem } = props;
  const classes = useStyles();

  return (
    <Box className={`${classes.root} ${!insideItem? classes.display:''}`}    >
      <Rating
        name="hover-feedback"
        value={rate || 0}
        precision={0.1}
        readOnly
      />
      {insideItem? (
      <Box sx={{ ml: 1, color: '#aaa' }}>
        ({text || 0})
      </Box>
      ):(
        <Box sx={{ ml: 1}}>
        {text || 0}
      </Box>
      )}
    </Box>
  );
};

export default Rate;