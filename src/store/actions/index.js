import StoreAPI from "../../apis/StoreAPI";
import { getMinMax } from '../../OwnMethods';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    VIEW_AS,
    SORT_BY,
    SET_PRICE_FILTER,
    SET_CATEGORIES_FILTER,
    SET_PRICE,
    SET_FILTERED_PRODUCTS,
    ADD_TO_SHOPPING_CART,
    EDIT_PRODUCT_QUANTITY_IN_SHOPPING_CART,
    DELETE_FROM_SHOPPING_CART,
    CLEAR_SHOPPING_CART
} from "./actionTypes";

const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};

const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    };
};

const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error
    };
};

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductsRequest);
        StoreAPI.get('/products')
        .then(response => {
            const products = response.data;
            const price = getMinMax(products, 'price');
            const categories = Object.assign({}, ...[...new Set(products.map(product => product.category))].map(item => ({[item]: false})));
            dispatch(fetchProductsSuccess(products));
            dispatch(setFilteredProducts(products));
            dispatch(setPriceFilter(price));
            dispatch(setPrice(price));
            dispatch(setCategoriesFilter(categories));
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(fetchProductsFailure(errorMsg));
        });
    };
};

export const viewAs = (way) => {
    return {
        type: VIEW_AS,
        payload: way
    };
};

export const sortBy = (value) => {
    return {
        type: SORT_BY,
        payload: value
    };
};

export const setPriceFilter = (price) => {
    return {
        type: SET_PRICE_FILTER,
        payload: price
    };
};


export const setCategoriesFilter = (categories) => {
    return {
        type: SET_CATEGORIES_FILTER,
        payload: categories
    };
};

export const setPrice = (price) => {
    return {
        type: SET_PRICE,
        payload: price
    };
};

export const setFilteredProducts = (filteredProducts) => {
    return {
        type: SET_FILTERED_PRODUCTS,
        payload: filteredProducts
    };
};

export const addToShoppingCart = (product) => {
    return {
        type: ADD_TO_SHOPPING_CART,
        payload: product
    };
};

export const editProductQuantityInShoppingCart = (id, quantity) => {
    return {
        type: EDIT_PRODUCT_QUANTITY_IN_SHOPPING_CART,
        payload: {id, quantity}
    };
};

export const deleteFromShoppingCart = (itemId) => {
    return {
        type: DELETE_FROM_SHOPPING_CART,
        payload: itemId
    };
};

export const clearShoppingCart = () => {
    return {
        type: CLEAR_SHOPPING_CART,
    };
};