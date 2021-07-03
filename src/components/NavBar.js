import React from "react";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//import Link from '@material-ui/core/Link';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import { Icon } from "semantic-ui-react";
import SearchBox from "./SearchBox";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    backgroundColor: "#fff",
    //padding: '0 50px'
  },
  search: {
    //float: "right !important",
    width: '50%'
  },
  title: {
    display: 'inline',
    marginRight: '50px'
  },
  linkTitle: {
    fontSize: '1.25rem',
    //color: '#fff',
    //marginRight: '15px'
    //marginLeft: '15px'
  },
}));

const NavBar = ({
  categories,
  getSearchAndCategory,
  shoppingCartLength /*wishlistLength*/,
}) => {
  const classes = useStyles();

  return (
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" >
                  Beda3a
                </Link>
              </Typography>
              <SearchBox
                categories={categories}
                getSearchAndCategory={getSearchAndCategory}
              />
            </Grid>
            <Grid item container direction='row' alignItems='center' justify='flex-end' xs={4}>
{/*               <Link to='/'>
                <span className={classes.linkTitle}>
                  <Icon name="user" color='grey' inverted/>
                  &nbsp;Log In
                </span>
              </Link>
              &nbsp;
              <Link to='/'>
                <span className={classes.linkTitle}>
                  <Icon name="add user" color='grey' inverted/>
                  &nbsp;Sign Up
                </span>
              </Link>
              &nbsp; */}
              <NavLink to="/cart">
                  <span className={classes.linkTitle}>
                    <Badge badgeContent={shoppingCartLength} color="secondary" >
                      <Icon name="shopping cart" color='grey' inverted/>
                    </Badge>
                    &nbsp;Cart
                  </span>
              </NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
};

export default NavBar;