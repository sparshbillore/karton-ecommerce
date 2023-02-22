import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');


const productReviewCreateSlice = createSlice({
    name: 'productReviewCreate',
    initialState: {},
    reducers: {
        productCreateReviewRequest(state, action) {
            state.product = action.payload;
        },
        productCreateReviewSuccess(state, action) {
            state.status = action.payload;
        },
        productCreateReviewFail(state,action){
            state.loading = false
            state.error = action.payload
        },
        productCreateReviewReset(state){
            state = {}
        }
    },
});

export const { productCreateReviewRequest, productCreateReviewSuccess, productCreateReviewFail, productCreateReviewReset } = productReviewCreateSlice.actions;
export default productReviewCreateSlice.reducer;



export const createProductReview = createAsyncThunk('products/createProductReview', async ( args , thunkAPI) => {
    
    try {
        thunkAPI.dispatch(productCreateReviewRequest());

        const {
            userLogin: { userInfo },
        } = thunkAPI.getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${args.productId}/reviews/`,
            args.review,
            config
        )

        thunkAPI.dispatch(productCreateReviewSuccess(data))
        } catch (error) {
                const payload = (error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message)
                console.log(error)
                thunkAPI.dispatch(productCreateReviewFail(payload));
        }});

