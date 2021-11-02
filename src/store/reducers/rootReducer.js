import { combineReducers } from "redux";

import { productsReducer } from "./productsReducer";
import { filtersReducer } from "./filtersReducer";
import { shoppingCartReducer } from "./shoppingCartReducer";
import { categoriesReducer } from './categoriesReducer';
import { productReducer } from './productReducer';
const rootReducer = combineReducers({
  productsReducer,
  categoriesReducer,
  filtersReducer,
  shoppingCartReducer,
  productReducer,
});

export default rootReducer;