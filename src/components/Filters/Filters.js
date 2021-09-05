import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Divider } from "@material-ui/core";

import CheckBoxList from "./CheckBoxList";
import RangeSlider from "./RangeSlider";
import {
  setFilteredProducts,
  setPriceFilter,
  setPrice,
} from "../../store/actions";

import {
  productsFilteredByCategories,
  productsFilteredByPrice,
  getMinMax,
  isAllFalse,
} from "../../HelperFunctions";

const Filters = (props) => {
  const {
    products,
    price,
    filteredProducts,
    filteredCategories,
    filteredPrice,
    setPriceFilter,
    setFilteredProducts,
    setPrice,
  } = props;

  useEffect(() => {
    let filteredByCategories;

    if (isAllFalse(filteredCategories)) {
      filteredByCategories = products;
    } else {
      filteredByCategories = productsFilteredByCategories(products, filteredCategories);
    }

    if (filteredByCategories.length > 0) {
      const price = getMinMax(filteredByCategories, "price");
      setFilteredProducts(filteredByCategories);
      setPriceFilter(price);
      setPrice(price);
    }
  }, [filteredCategories]);

  useEffect(() => {
    let filteredByPrice;

    if (filteredProducts.length === 0) {
      filteredByPrice = productsFilteredByPrice(products, filteredPrice);
    } else {
      const filteredByCategories = productsFilteredByCategories(products, filteredCategories);

      filteredByPrice = productsFilteredByPrice(filteredByCategories, filteredPrice);
    }

    if (filteredByPrice.length > 0) {
      setFilteredProducts(filteredByPrice);
    }
  }, [filteredPrice]);

  return (
    <Grid style={{ padding: 5 }}>
      <CheckBoxList title="Categories" checkBoxList={filteredCategories} />
      <Divider />
      <RangeSlider title="Price ($)" start={price.start} end={price.end} />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    price: state.filters.price,
    filteredProducts: state.filters.filteredProducts,
    filteredCategories: state.filters.filteredCategories,
    filteredPrice: state.filters.filteredPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilteredProducts: (newFilteredProducts) =>
      dispatch(setFilteredProducts(newFilteredProducts)),
    setPriceFilter: (newFilteredPrice) =>
      dispatch(setPriceFilter(newFilteredPrice)),
    setPrice: (newPrice) => dispatch(setPrice(newPrice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);