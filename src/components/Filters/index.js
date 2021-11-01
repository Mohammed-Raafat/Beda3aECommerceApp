import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Grid, Divider } from "@mui/material";

import {
  setFilteredProducts,
  setPriceFilter,
  setPrice,
} from "../../store/actions";

import {
  productsFilteredByCategories,
  productsFilteredByPrice,
  productsFilteredByRate,
  getMinMax,
  isAllFalse,
} from "../../HelperFunctions";

  import CheckBoxList from "./CheckBoxList";
  import RangeSlider from "./RangeSlider";
  import RadioBtnList from './RadioBtnList';

const Filters = (props) => {
  const {
    products,
    price,
    filteredProducts,
    filteredCategories,
    filteredPrice,
    filteredRate,
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

  useEffect(() => {
    // Needs improvment
    let filteredByRate;
    if(filteredProducts.length === 0) {
      filteredByRate = productsFilteredByRate(products, filteredRate);
    } else {
      filteredByRate = productsFilteredByRate(filteredProducts, filteredRate);
    }

    setFilteredProducts(filteredByRate);
  }, [filteredRate]);

  return (
    <Grid style={{ padding: 5 }}>
      <CheckBoxList />
      <Divider style={{margin: '10px 0'}}/>
      <RangeSlider title="Price ($)" start={price.start} end={price.end} />
      <Divider style={{margin: '10px 0'}}/>
      <RadioBtnList />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    price: state.filtersReducer.price,
    filteredProducts: state.filtersReducer.filteredProducts,
    filteredCategories: state.filtersReducer.filteredCategories,
    filteredPrice: state.filtersReducer.filteredPrice,
    filteredRate: state.filtersReducer.filteredRate,
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