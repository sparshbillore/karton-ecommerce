import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const orderListMy = createSlice({
    name: 'orderListMy',
    initialState: {
        orders: [],
    },
    reducers: {
        orderListMyRequest(state){
            state.loading = true
        },
        orderListMySuccess(state, action){
            state.loading = false
            state.orders = action.payload
        },
        orderListMyFail(state, action){
            state.loading = false
            state.error = action.payload
        },
        orderListMyReset(state){
            state = {
                orders: [],
            }
        },
    },

})



export const {orderListMyRequest, orderListMySuccess, orderListMyFail, orderListMyReset } = orderListMy.actions;
export default orderListMy.reducer;



// Thunks
export const listMyOrders = createAsyncThunk('orders/listMyOrders', async (arg , thunkAPI) => {

    try {
        thunkAPI.dispatch(orderListMyRequest());
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
            '/api/orders/myorders/',
            config
        )

        thunkAPI.dispatch(orderListMySuccess(data))
        } catch (error) {
                const payload = (error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message)
                console.log(error)
                thunkAPI.dispatch(orderListMyFail(payload));
        }});

