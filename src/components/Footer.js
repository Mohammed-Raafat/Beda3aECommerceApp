import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    height: "40px",
    background: "#323232",
    color: "#fff",
    left: 0,
    bottom: 0,
    right: 0,
  },
  logo: {
    display: "inline",
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <div>
        <Typography variant="h6" className={classes.logo}>
          <Link to="/">beda3a</Link>
        </Typography>
        &nbsp;&nbsp;|&nbsp;&nbsp;2021&nbsp;&copy;
      </div>
    </Grid>
  );
};

export default Footer;