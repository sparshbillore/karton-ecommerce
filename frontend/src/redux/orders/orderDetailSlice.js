import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');


const orderDetails = createSlice({
    name: 'orderDetails',
    initialState: {
        loading: true, 
        orderItems: [], 
        shippingAddress: {}
    },
    reducers: {
        orderDetailRequest(state){
            state.loading = true
        },
        orderDetailSuccess(state, action){
            state.loading = false
            state.order = action.payload
        },
        orderDetailFail(state, action){
            state.loading = false
            state.error = action.payload
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

export const {orderDetailRequest, orderDetailSuccess, orderDetailFail } = orderDetails.actions;
export default orderDetails.reducer;


// Thunks
export const getOrderDetails = createAsyncThunk('orders/getOrder', async (id, thunkAPI) => {
    console.log('hello',thunkAPI)
    thunkAPI.dispatch(orderDetailRequest());
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

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
        )

        thunkAPI.dispatch(orderDetailSuccess(data))

        
        } catch (error) {
                const payload = (error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message)
                thunkAPI.dispatch(orderDetailFail(payload));
            }
        });


// export function createOrderAction() {
//     return async function createOrderThunk(order, dispatch) {
//         dispatch(createOrder(order))
//         dispatch(clearCartItems())
//         localStorage.removeItem('cartItems')
//     };
// }


