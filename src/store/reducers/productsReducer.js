import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: false,
  products: [],
  error: "",
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: INITIAL_STATE.error,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: INITIAL_STATE.loading,
        products: action.payload,
        error: INITIAL_STATE.error,
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: INITIAL_STATE.products,
        error: action.payload,
      };

    default:
      return state;
  }
};