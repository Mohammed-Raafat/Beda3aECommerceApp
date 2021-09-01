import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import NavBar from './NavBar';
import Home from './Home';
//import WishlistPage from './WishlistPage';
import ShoppingCart from './ShoppingCart';
import Footer from './Footer';
import { fetchProducts } from './../store/actions';

const App = (props) => {
  const { fetchProducts } = props;

  useEffect(() => {
    fetchProducts();
  }, []);

  const getSearchAndCategory = (obj) => {
    console.log(obj)
/*       const { searchTerm, category } = obj;
      const { products } = this.state;

      const categorizedProducts = (category === 'all')? products : products.filter(product => product.category === category);

      const newFilterdProducts = categorizedProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));

      if(newFilterdProducts.length > 0) {
        this.setState({
          filteredProducts: newFilterdProducts,
          filteredPrice: this.getMinMax(newFilterdProducts, 'price')
        });
      } else {
        alert('No results found.');
      } */
    };
    
    return (
      <Container maxWidth='xl' style={{position: 'relative', minHeight: '100vh', padding: 0,  margin: 0, backgroundColor: '#f5f5f5'}}>
        <NavBar />

        <Container style={{paddingTop: 80, paddingBottom: 50}} maxWidth='lg'>
          <Grid item>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/cart' exact component={ShoppingCart} />
                
              {/* <Route
                path='/wishlist'
                exact
                render={(props) => <WishlistPage wishlist={this.state.wishlist} getWishlist={this.getWishlist} shoppingCart={this.state.shoppingCart} {...props} />}
              /> */}
            </Switch>
          </Grid>
        </Container>

        <Footer />
      </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(null, mapDispatchToProps)(App);