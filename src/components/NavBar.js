import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, AppBar, Toolbar, Typography, Badge } from "@material-ui/core";
import SearchBox from "./SearchBox";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  search: {
    width: '50%'
  },
  title: {
    display: 'inline',
  },
  linkTitle: {
    fontSize: '1.25rem',
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

const NavBar = (props) => {
  const { loading, shoppingCartLength /*wishlistLength*/ } = props;
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
                <SearchBox />
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

const mapStateToProps = (state) => {
  return {
    loading: state.products.loading,
    shoppingCartLength: state.shoppingCart.shoppingCart.length
  };
};

export default connect(mapStateToProps)(NavBar);