import {
  APPEND_TO_SHOPPING_CART,
  EDIT_PRODUCT_QUANTITY_IN_SHOPPING_CART,
  DELETE_FROM_SHOPPING_CART,
  CLEAR_SHOPPING_CART,
} from "../actions/actionTypes";

import {
  addToArray,
  deleteFromArray,
  editInArray,
} from "../../HelperFunctions";

const INITIAL_STATE = {
  shoppingCart: [],
};

export const shoppingCartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_TO_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: addToArray(state.shoppingCart, {
          id: action.payload.id,
          product: action.payload,
          quantity: 1,
        }),
      };

    case EDIT_PRODUCT_QUANTITY_IN_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: editInArray(
          state.shoppingCart,
          action.payload.id,
          "quantity",
          action.payload.quantity
        ),
      };

    case DELETE_FROM_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: deleteFromArray(state.shoppingCart, action.payload),
      };

    case CLEAR_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: [],
      };

    default:
      return state;
  }
};