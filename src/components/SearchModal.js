import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { Item, Modal } from "semantic-ui-react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { addToShoppingCart } from "../store/actions";
import ProductGridCard from "./home/ProductGridCard";
import ProductListCard from "./home/ProductListCard";


const useStyles = makeStyles({
  root: {
    marginTop: '80px !important'
  },
});

const SearchModal = (props) => {
  const { searchTerm, products, wayViewAs, addToShoppingCart, navbarRef } = props;
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  const search = () => {
    const searchResults = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(searchResults);
  };

  const handleAddToCart = (product) => addToShoppingCart(product);

  const handleCloseModal = () => {
    setOpen(false);
  };
  
  const handleProductClick = (product) => {
    handleCloseModal();
    if(product) {
      history.push(`/products/${product.id}`);
    }
  };

  const renderResults = () => {
    if (results.length === 0) {
      return <div>No results are found</div>;
    } else if (wayViewAs === "grid") {
      return (
        <Grid container item>
          {results.map((product) => (
            <ProductGridCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleProductClick={handleProductClick}
            />
          ))}
        </Grid>
      );
    } else if (wayViewAs === "list") {
      return (
        <Item.Group divided>
          {results.map((product) => (
            <ProductListCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Item.Group>
      );
    }
  };

  useEffect(() => {
    if (searchTerm) {
      search();
    }
  }, [searchTerm]);

  useEffect(() => {
    const navbarRefCurrent = navbarRef.current;
    if (navbarRef && navbarRefCurrent) {
      navbarRefCurrent.addEventListener('click', handleCloseModal);
    }

    return () => {
      navbarRefCurrent.removeEventListener('click', handleCloseModal);
    }
  }, []);

  return (
    <Modal
      onClose={handleCloseModal}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.children}
      className={classes.root}
      closeIcon
    >
      <Modal.Header>Results</Modal.Header>
      <Modal.Content>{renderResults()}</Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    wayViewAs: state.filtersReducer.viewAs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToShoppingCart: (product) => dispatch(addToShoppingCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
