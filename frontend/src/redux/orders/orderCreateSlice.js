import axios from 'axios';
import { clearCartItems } from '../cart/cartSlice';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');





const orderCreate = createSlice({
    name: 'orderCreate',
    initialState: {},
    reducers: {
        createOrderRequest(state){
            state.loading = true
        },
        createOrderSuccess(state, action){
            state.loading = false
            state.success = true
            state.order = action.payload
        },
        createOrderFail(state, action){
            state.loading = false
            state.error = action.payload
        },

        orderCreateReset(state){
            state = {}
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(createOrder.pending, (state, action) => {
    //             state.loading = true
    //         })
    //         .addCase(createOrder.fulfilled, (state, action) => {
    //             state.loading = false
    //             state.success = true
    //             state.order = action.payload
    //         })
    //         .addCase(createOrder.rejected, (state, action) => {
    //             state.loading = false
    //             state.error = action.payload
    //         })
    // },
})

export const {createOrderRequest, createOrderFail, createOrderSuccess, orderCreateReset } = orderCreate.actions;
export default orderCreate.reducer;


// Thunks
export const createOrder = createAsyncThunk('orders/createOrder', async (order, thunkAPI) => {
    thunkAPI.dispatch(createOrderRequest());
    try {
        
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
            `/api/orders/add/`,
            order,
            config
        )

        thunkAPI.dispatch(createOrderSuccess(data))
        thunkAPI.dispatch(clearCartItems())
        localStorage.removeItem('cartItems')

        return data
        } catch (error) {
                thunkAPI.dispatch(createOrderFail(error));
            }
        });


// export function createOrderAction() {
//     return async function createOrderThunk(order, dispatch) {
//         dispatch(createOrder(order))
//         dispatch(clearCartItems())
//         localStorage.removeItem('cartItems')
//     };
// }


