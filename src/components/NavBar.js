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
import { Grid, Container } from "@material-ui/core";

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
    //marginRight: '50px'
  },
  linkTitle: {
    fontSize: '1.25rem',
    //color: '#fff',
    //marginRight: '15px'
    //marginLeft: '15px'
  },
  badge: {
    width: '15px',
    height: '15px',
    fontSize: '10px',
    minWidth: 0,
    top: '3px',
    right: '5px'
  }
}));

const NavBar = ({ loading, categories, getSearchAndCategory, shoppingCartLength /*wishlistLength*/ }) => {
  const classes = useStyles();

  return (
      <AppBar position="fixed" className={classes.root}>
        <Container maxWidth='lg'>
        <Toolbar style={{padding: 0}}>
          <Grid container>
            <Grid item container alignItems='center' xs={10} md={8}>
              <Grid item xs={3} md={2}>
                <Typography variant="h6" className={classes.title}>
                  <Link to="/" >
                    beda3a
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <SearchBox
                  loading={loading}
                  categories={categories}
                  getSearchAndCategory={getSearchAndCategory}
                />
              </Grid>
            </Grid>
            <Grid item container direction='row' alignItems='center' justify='flex-end' xs={2} md={4}>
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
                    <Grid container alignItems='center'>
                    <Badge badgeContent={shoppingCartLength} color="secondary" classes={{badge: classes.badge}}>
                      <Icon name="shopping cart" color='grey' inverted/>
                    </Badge>
                      <span>&nbsp;Cart</span>
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