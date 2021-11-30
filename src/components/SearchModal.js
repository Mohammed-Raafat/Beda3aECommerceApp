import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Item, Modal } from "semantic-ui-react";
import { Grid } from "@mui/material";

import { addToShoppingCart } from "../store/actions";
import ProductGridCard from "./home/ProductGridCard";
import ProductListCard from "./home/ProductListCard";

const SearchModal = (props) => {
  const { searchTerm, products, wayViewAs, addToShoppingCart } = props;

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

  const handleAddToCart = (product) => {
    addToShoppingCart(product);
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

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.children}
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
