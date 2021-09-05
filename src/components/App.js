import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar/NavBar";
import Home from "./Home/Home";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import Footer from "./Footer";
import { fetchProducts } from "./../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    padding: 0,
    margin: 0,
    backgroundColor: "#f5f5f5",
  },
  insideContainer: {
    paddingTop: 80,
    paddingBottom: 50,
  },
}));

const App = (props) => {
  const { fetchProducts } = props;
  const classes = useStyles();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <NavBar />

      <Container maxWidth="lg" className={classes.insideContainer}>
        <Grid item>
          <Switch>
            <Route path="/cart" exact component={ShoppingCart} />
            <Route path="/" exact component={Home} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Grid>
      </Container>

      <Footer />
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(null, mapDispatchToProps)(App);

{
  /* <Route
                path='/wishlist'
                exact
                render={(props) => <WishlistPage wishlist={this.state.wishlist} getWishlist={this.getWishlist} shoppingCart={this.state.shoppingCart} {...props} />}
              /> */
}
