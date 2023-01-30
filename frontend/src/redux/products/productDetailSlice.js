import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');


const productDetailSlice = createSlice({
    name: 'productDetailsList',
    initialState: {
        product: { reviews: [] },
    },
    reducers: {
        productDetailRequest(state, action) {
            state.loading = true
        },
        productDetailSuccess(state, action) {
            state.loading = false
            state.product = action.payload;
        },
        productDetailFail(state, action) {
            state.loading = false
            state.error = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProducts.pending, (state, action) => {
    //             state.status = STATUSES.LOADING;
    //         })
    //         .addCase(fetchProducts.fulfilled, (state, action) => {
    //             state.data = action.payload;
    //             state.status = STATUSES.IDLE;
    //         })
    //         .addCase(fetchProducts.rejected, (state, action) => {
    //             state.status = STATUSES.ERROR;
    //         });
    // },
});

export const { productDetailSuccess, productDetailRequest, productDetailFail } = productDetailSlice.actions;
export default productDetailSlice.reducer;


// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//     const res = await fetch('https://fakestoreapi.com/products');
//     const data = await res.json();
//     return data;
// });


export function fetchDetails(id) {
    return async function (dispatch, getState) {
        
        try {
            dispatch(productDetailRequest());
            const { data } = await axios.get(`/api/products/${id}`)
            dispatch(productDetailSuccess(data));
    
        } catch (error) {
            dispatch(productDetailFail(error));
        }
    };
}

