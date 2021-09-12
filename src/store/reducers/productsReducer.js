import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: true,
  products: [],
  categories: [],
  error: "",
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        categories: action.payload.categoriesNames,
        error: "",
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};