import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import { Icon } from "semantic-ui-react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Hidden,
} from "@mui/material";

import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff !important",
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
    width: "17px !important",
    height: "17px !important",
    minWidth: "17px !important",
    top: "-2px !important",
    right: "3px !important",
    backgroundColor: '#FF5C58',
    color: '#fff'
  },
  logo: {
    fontFamily: "'Comfortaa', cursive",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
}));

const NavBar = (props) => {
  const { shoppingCartLength, loading } = props;
  const classes = useStyles();
  const navbarRef = useRef();

  return (
    <AppBar position="fixed" className={classes.root} ref={navbarRef}>
      <Container maxWidth="xl">
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
                <SearchBox loading={loading} navbarRef={navbarRef} />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              xs={2}
              md={4}
            >
              <NavLink to="/cart">
                <span className={classes.linkTitle}>
                  <Grid container alignItems="center">
                    <Badge
                      badgeContent={shoppingCartLength}
                      classes={{ badge: classes.badge }}
                    >
                      <Icon name="shopping cart" />
                    </Badge>
                    <Hidden smDown>
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