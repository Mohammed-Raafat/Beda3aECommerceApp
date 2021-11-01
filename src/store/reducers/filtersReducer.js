import {
  VIEW_AS,
  SORT_BY,
  SET_PRICE_FILTER,
  SET_CATEGORIES_FILTER,
  SET_RATING_FILTER,
  SET_PRICE,
  SET_FILTERED_PRODUCTS,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  viewAs: "grid",
  sortBy: "featured",
  price: {
    start: 0,
    end: 0,
  },
  filteredCategories: {},
  filteredProducts: [],
  filteredRate: 1,
  filteredPrice: {
    start: 0,
    end: 0,
  },
};

export const filtersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIEW_AS:
      return {
        ...state,
        viewAs: action.payload,
      };

    case SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };

    case SET_PRICE_FILTER:
      return {
        ...state,
        filteredPrice: action.payload,
      };

    case SET_CATEGORIES_FILTER:
      return {
        ...state,
        filteredCategories: action.payload,
      };

    case SET_RATING_FILTER:
      return {
        ...state,
        filteredRate: action.payload
      };

    case SET_PRICE:
      return {
        ...state,
        price: action.payload,
      };

    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    default:
      return state;
  }
};