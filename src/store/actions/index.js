import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  VIEW_AS,
  SORT_BY,
  SET_PRICE_FILTER,
  SET_CATEGORIES_FILTER,
  SET_RATING_FILTER,
  SET_PRICE,
  SET_FILTERED_PRODUCTS,
  APPEND_TO_SHOPPING_CART,
  EDIT_PRODUCT_QUANTITY_IN_SHOPPING_CART,
  DELETE_FROM_SHOPPING_CART,
  CLEAR_SHOPPING_CART,
} from "./actionTypes";

import StoreAPI from "../../apis/StoreAPI";
import { getMinMax } from "../../HelperFunctions";

const fetchCategoriesRequest = () => {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
};

const fetchCategoriesSuccess = (data) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: data,
  };
};

const fetchCategoriesFailure = (error) => {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(fetchCategoriesRequest());

    StoreAPI.get("/products/categories")
      .then((response) => {
        const categories = response.data;

        const filteredCategories = {};
        categories.forEach((category) => (filteredCategories[category] = false))
        
        dispatch(fetchCategoriesSuccess(categories));
        dispatch(setCategoriesFilter(filteredCategories));
      })
      .catch((error) => {
        const errorMsg = error.message;
        if(errorMsg === 'Network Error') {
          dispatch(fetchCategoriesFailure('Please check your internet connection.'));
        } else {
          dispatch(fetchCategoriesFailure('An error has occurred. Please try again later.'));
        }
      });
  };
};

const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

const fetchProductsSuccess = (data) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data,
  };
};

const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());

    StoreAPI.get("/products")
      .then((response) => {
        const products = response.data;
        const price = getMinMax(products, "price");
        
        dispatch(fetchProductsSuccess(products));
        dispatch(setFilteredProducts(products));
        dispatch(setPriceFilter(price));
        dispatch(setPrice(price));
      })
      .catch((error) => {
        const errorMsg = error.message;
        if(errorMsg === 'Network Error') {
          dispatch(fetchProductsFailure('Please check your internet connection.'));
        } else {
          dispatch(fetchProductsFailure('An error has occurred. Please try again later.'));
        }
      });
  };
};

const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};

const fetchProductSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: data,
  };
};

const fetchProductFailure = (error) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  };
};

export const fetchProduct = (id) => {
  return (dispatch) => {
    dispatch(fetchProductRequest());
    StoreAPI.get(`/products/${id}`)
    .then((response) => {
        const product = response.data;
        dispatch(fetchProductSuccess(product));
      })
      .catch((error) => {
        const errorMsg = error.message;
        if(errorMsg === 'Network Error') {
          dispatch(fetchProductFailure('Please check your internet connection.'));
        } else {
          dispatch(fetchProductFailure('An error has occurred. Please try again later.'));
        }
      });
  };
};

export const viewAs = (way) => {
  return {
    type: VIEW_AS,
    payload: way,
  };
};

export const sortBy = (value) => {
  return {
    type: SORT_BY,
    payload: value,
  };
};

export const setPriceFilter = (price) => {
  return {
    type: SET_PRICE_FILTER,
    payload: price,
  };
};

export const setCategoriesFilter = (categories) => {
  return {
    type: SET_CATEGORIES_FILTER,
    payload: categories,
  };
};

export const setRatingFilter = (rate) => {
  return {
    type: SET_RATING_FILTER,
    payload: rate,
  };
};

export const setPrice = (price) => {
  return {
    type: SET_PRICE,
    payload: price,
  };
};

export const setFilteredProducts = (filteredProducts) => {
  return {
    type: SET_FILTERED_PRODUCTS,
    payload: filteredProducts,
  };
};

export const appendToShoppingCart = (item) => {
  return {
    type: APPEND_TO_SHOPPING_CART,
    payload: item,
  };
};

export const editProductQuantityInShoppingCart = (id, quantity) => {
  return {
    type: EDIT_PRODUCT_QUANTITY_IN_SHOPPING_CART,
    payload: { id, quantity },
  };
};

export const addToShoppingCart = (product) => {
  return (dispatch, getState) => {
    const shoppingCart = getState().shoppingCartReducer.shoppingCart;
    if (shoppingCart.length === 0) {
      dispatch(appendToShoppingCart(product));
    } else {
      const index = shoppingCart.map((item) => item.product).indexOf(product);
      if (index !== -1) {
        if (shoppingCart[index].quantity < 7) {
          // Check if it's smaller than the max quantity allowed to user or the store has,
          // and here it's a static number 7 for example
          dispatch(
            editProductQuantityInShoppingCart(
              shoppingCart[index].id,
              shoppingCart[index].quantity + 1
            )
          );
        }
      } else {
        dispatch(appendToShoppingCart(product));
      }
    }
  };
};

export const deleteFromShoppingCart = (itemId) => {
  return {
    type: DELETE_FROM_SHOPPING_CART,
    payload: itemId,
  };
};

export const clearShoppingCart = () => {
  return {
    type: CLEAR_SHOPPING_CART,
  };
};