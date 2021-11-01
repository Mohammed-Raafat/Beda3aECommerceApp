import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: false,
  categories: [],
  error: "",
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: INITIAL_STATE.error,
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: INITIAL_STATE.loading,
        categories: action.payload,
        error: "",
      };

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        categories: INITIAL_STATE.categories,
      };

    default:
      return state;
  }
};