import React from "react";
import { Link, NavLink } from "react-router-dom";

import { Icon } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Hidden,
} from "@material-ui/core";

import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  search: {
    width: "50%",
  },
  title: {
    display: "inline",
  },
  linkTitle: {
    fontSize: "1.25rem",
  },
  badge: {
    width: "15px",
    height: "15px",
    fontSize: "10px",
    minWidth: 0,
    top: "-2px",
    right: "3px",
  },
  logo: {
    fontFamily: "'Comfortaa', cursive",
    fontSize: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
}));

const NavBar = (props) => {
  const { shoppingCartLength } = props;
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar style={{ padding: 0 }}>
          <Grid container>
            <Grid item container alignItems="center" xs={10} md={8}>
              <Grid item xs={4} md={3}>
                <Typography variant="h6" className={classes.title}>
                  <Link to="/" className={classes.logo}>
                    beda3a
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={8} md={9}>
                <SearchBox />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
              xs={2}
              md={4}
            >
              <NavLink to="/cart">
                <span className={classes.linkTitle}>
                  <Grid container alignItems="center">
                    <Badge
                      badgeContent={shoppingCartLength}
                      color="secondary"
                      classes={{ badge: classes.badge }}
                    >
                      <Icon name="shopping cart" />
                    </Badge>
                    <Hidden xsDown>
                      <span>&nbsp;Cart</span>
                    </Hidden>
                  </Grid>
                </span>
              </NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;