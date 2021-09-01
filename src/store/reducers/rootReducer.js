import { combineReducers } from 'redux';
import { productsReducer } from './productsReducer';
import { filtersReducer } from './filtersReducer';
import { shoppingCartReducer } from './shoppingCartReducer';

const rootReducer =  combineReducers({
    products: productsReducer,
    filters: filtersReducer,
    shoppingCart: shoppingCartReducer
});

export default rootReducer;