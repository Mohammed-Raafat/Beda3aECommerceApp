import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "./../store/actions";

const Product = (props) => {
  const { product, match } = props;
  const id = match.params.id;

  useEffect(() => {
    fetchProduct(id);
  }, []);

  useEffect(() => {
    console.log(id,product);
  }, [product]);

  return <div>Product</div>;
};

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
