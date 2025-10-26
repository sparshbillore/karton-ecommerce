import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');





const orderPay = createSlice({
    name: 'orderPay',
    initialState: {},
    reducers: {
        orderDetailRequest(state){
            state.loading = true
        },
        orderPaySuccess(state, action){
            state.loading = false
            state.success = true
        },
        orderDetailFail(state, action){
            state.loading = false
            state.error = action.payload
        },
        orderDetailReset(state){
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

export const {orderDetailRequest, orderPaySuccess, orderDetailFail, orderDetailReset } = orderPay.actions;
export default orderPay.reducer;


// Thunks
export const payOrder = createAsyncThunk('orders/payOrder', async (attr,thunkAPI) => {
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

        const { data } = await axios.put(
            `/api/orders/${attr.id}/pay/`,
            attr.paymentResult,
            config
        )

        thunkAPI.dispatch(orderPaySuccess(data))

        
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


