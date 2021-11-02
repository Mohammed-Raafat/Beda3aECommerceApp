import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: false,
  product: {},
  error: "",
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: INITIAL_STATE.error,
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: INITIAL_STATE.loading,
        product: action.payload,
        error: INITIAL_STATE.error,
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        product: INITIAL_STATE.currentProduct,
        error: action.payload,
      };

    default:
      return state;
  }
};