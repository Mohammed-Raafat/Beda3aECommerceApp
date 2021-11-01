import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import { Container, Grid, createTheme } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";

import NavBar from "./NavBar";
import Home from "./Home";
import ShoppingCart from "./ShoppingCart";
import Footer from "./Footer";
import Toast from "./Toast";
import { fetchProducts } from "../store/actions";

const theme = createTheme();

const useStyles = makeStyles(() => ({
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
  const {
    fetchProducts,
    shoppingCart,
    shoppingCartLength,
    errorMessage,
    loading,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className={classes.root}>
        <NavBar shoppingCartLength={shoppingCartLength} loading={loading} />

        <Container maxWidth="lg" className={classes.insideContainer}>
          <Grid item>
            <Switch>
              <Route
                path="/cart"
                exact
                render={() => <ShoppingCart shoppingCart={shoppingCart} />}
              />
              <Route path="/" exact component={Home} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Grid>
        </Container>

        <Footer />
        {errorMessage && (
          <Toast
            message={errorMessage}
            buttonText="Retry"
            buttonOnClick={fetchProducts}
            close
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCartReducer.shoppingCart,
    shoppingCartLength: state.shoppingCartReducer.shoppingCart.length,
    errorMessage: state.productsReducer.error,
    loading: state.productsReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);