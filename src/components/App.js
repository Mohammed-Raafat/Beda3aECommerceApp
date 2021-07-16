import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import StoreAPI from '../apis/StoreAPI';
import NavBar from './NavBar';
import Home from './Home';
//import WishlistPage from './WishlistPage';
import ShoppingCart from './ShoppingCart';
import Footer from './Footer';

class App extends Component {
    state = {
      loading: false,
      products: [],
      categories: [],
      filteredProducts: [],
      filteredCategories: {},
      filteredPrice: {},
      //wishlist: [],
      shoppingCart: [],
      sortedBy: 'default',
      listOrGrid: 'grid'
    };

    /* saveToLocal = () => {
      const local = this.state.shoppingCart;
      localStorage.setItem('shoppingCart', JSON.stringify(local));
    } */

    getMinMax = (arr, value) => {
      return {
        start: Math.min.apply(null, arr.map(item => item[value])), 
        end: Math.max.apply(null, arr.map(item => item[value]))
      };
    };

    componentDidMount() {
      this.setState({
        loading: true
      });
      StoreAPI.get('/products'/* , {params: { limit: 5 }} */)
      .then(({data}) => {
        this.setState({
          loading: false,
          products: data,
          categories: [...new Set(data.map(product => product.category))],
          filteredProducts: data,
          filteredCategories: Object.assign({}, ...[...new Set(data.map(product => product.category))].map(item => ({[item]: false}))),
          filteredPrice: this.getMinMax(data, 'price')
        });
      })
      .catch((error) => {
        this.setState({
          loading: true
        });
        console.log(error)
      });
    }

    getPriceFilteration = (price) => {
      const { products, filteredCategories } = this.state;
      let newFilterdProducts;

      if(this.isAllFalse(filteredCategories)) {
        newFilterdProducts = products;
      } else {
        newFilterdProducts = products.filter(product => filteredCategories[product.category]);
      }

      newFilterdProducts = newFilterdProducts.filter(product => product.price >= price[0] && product.price <= price[1]);

      this.setState({
        filteredProducts: newFilterdProducts,
        filteredPrice: this.getMinMax(newFilterdProducts, 'price')
      });
    };

    isAllFalse = (obj) => {
      for (let i in obj) {
          if (obj[i] === true) {
              return false;
          }
      }

      return true;
    };

    getCategoriesFilteration = (categories) => {
      let newFilterdProducts;

      if(this.isAllFalse(categories)) {
        newFilterdProducts = this.state.products;
      } else {
        newFilterdProducts = this.state.products.filter(product => categories[product.category]);
      }

      this.setState({
        filteredProducts: newFilterdProducts,
        filteredCategories: categories,
        filteredPrice: this.getMinMax(newFilterdProducts, 'price')
      });
    };

    getSearchAndCategory = (obj) => {
      const { searchTerm, category } = obj;
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
      }
    };

    getProductAddedToCart = (product) => {
      const shoppingCartArr = this.state.shoppingCart;
      const index = shoppingCartArr.map(item => item.product).indexOf(product);
      
      if(index === -1) {
        shoppingCartArr.push({
          product: product,
          quantity: 1
        });
      } else {
        shoppingCartArr[index].quantity += 1;
      }
      
      this.setState({
        shoppingCart: shoppingCartArr
      });//, this.saveToLocal);
    };
    
    /* getProductAddedToWishlist = (product, loved) => {
      let wishlistArr = this.state.wishlist;
      if(loved) {
        wishlistArr.push(product); 
      } else {
        wishlistArr = wishlistArr.filter(prod => prod !== product);
      }

      this.setState({
        wishlist: wishlistArr
      });
    }; */

    getNewItemQuantity = (item, quantity) => {
      const shoppingCartArr = this.state.shoppingCart;
      const index = shoppingCartArr.indexOf(item);
      shoppingCartArr[index].quantity = quantity;

      this.setState({
        shoppingCart: shoppingCartArr
      });//, this.saveToLocal);
    };

    getRemovedItemFromCart = (item) => {
      const shoppingCartArr = this.state.shoppingCart.filter(i => i.product.id !== item.product.id);
      
      this.setState({
        shoppingCart: shoppingCartArr
      });//, this.saveToLocal);
    };

    getRemoveAllItemsFromCart = (flag) => {
      if(flag) {
        this.setState({
          shoppingCart: []
        });
      }
    };

    getSortedBy = (val) => {
      this.setState({
        sortedBy: val
      });
    };

/*     getWishlist = () => {
      
    }; */
    
    getShoppingCart = () => {
      
    };
    
    render() {
      /* if(this.state.products.length === 0) {
        return (
            <Skeleton variant="rect" width={210} height={118} />
        );
      } */

      return (
          <Container maxWidth='xl' style={{position: 'relative', minHeight: '100vh', padding: 0,  margin: 0, backgroundColor: '#f5f5f5'}}>
            <NavBar loading={this.state.loading} categories={this.state.categories} getSearchAndCategory={this.getSearchAndCategory} shoppingCartLength={this.state.shoppingCart.length} /* wishlistLength={this.state.wishlist.length} *//>

            <Container style={{paddingTop: 80, paddingBottom: 50}} maxWidth='lg'>
              <Grid item>
                <Switch>
                  <Route
                    path='/'
                    exact
                    render={(props) => <Home state={this.state} getPriceFilteration={this.getPriceFilteration} getCategoriesFilteration={this.getCategoriesFilteration} getProductAddedToCart={this.getProductAddedToCart} /*getProductAddedToWishlist={this.getProductAddedToWishlist}*/ getSortedBy={this.getSortedBy} {...props} />}
                  />
                  {/* <Route
                    path='/wishlist'
                    exact
                    render={(props) => <WishlistPage wishlist={this.state.wishlist} getWishlist={this.getWishlist} shoppingCart={this.state.shoppingCart} {...props} />}
                  /> */}
                  <Route
                    path='/cart'
                    exact
                    render={(props) => <ShoppingCart shoppingCart={this.state.shoppingCart} getShoppingCart={this.getShoppingCart} getRemovedItemFromCart={this.getRemovedItemFromCart} getRemoveAllItemsFromCart={this.getRemoveAllItemsFromCart} getNewItemQuantity={this.getNewItemQuantity} {...props} />}
                  />
                </Switch>
              </Grid>
            </Container>

            <Footer />
          </Container>
      );
    }
}
 
export default App;