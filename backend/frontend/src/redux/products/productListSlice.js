import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');


export const PRODUCT_LIST_STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});


const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        status: PRODUCT_LIST_STATUSES.IDLE,
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload.products
            state.page = action.payload.page
            state.pages = action.payload.pages
        },

        setStatus(state, action) {
            state.status = action.payload;
        },
    },
    
});

export const { setProducts, setStatus } = productListSlice.actions;
export default productListSlice.reducer;



export function fetchProducts(keyword = '') {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(PRODUCT_LIST_STATUSES.LOADING));
        try {
            
            const { data } = await axios.get(`/api/products${keyword}`)
            dispatch(setProducts(data));
            dispatch(setStatus(PRODUCT_LIST_STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(PRODUCT_LIST_STATUSES.ERROR));
        }
    };
}