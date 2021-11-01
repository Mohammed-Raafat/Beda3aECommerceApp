import { combineReducers } from "redux";

import { productsReducer } from "./productsReducer";
import { filtersReducer } from "./filtersReducer";
import { shoppingCartReducer } from "./shoppingCartReducer";
import { categoriesReducer } from './categoriesReducer';

const rootReducer = combineReducers({
  productsReducer,
  categoriesReducer,
  filtersReducer,
  shoppingCartReducer,
});

export default rootReducer;