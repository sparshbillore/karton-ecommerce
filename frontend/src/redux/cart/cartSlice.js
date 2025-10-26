import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems : cartItemsFromStorage,
        shippingAddress :  shippingAddressFromStorage,
    },
    reducers: {
        cartAddItem(state, action) {
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    cartItems: [...state.cartItems, item]
                }
            }
        },
        cartRemoveItem(state, action) {
            return {
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        },

        cartSaveShippingAddress(state, action){
            state.shippingAddress = action.payload
        },

        cartSavePaymentMethod(state, action){
            state.paymentMethod = action.payload
        },

        clearCartItems(state, action){
            state.cartItems = []
        }
    },
})

export const { cartAddItem, cartRemoveItem, cartSaveShippingAddress, cartSavePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;


export function addToCart(id, qty) {
    return async function (dispatch, getState) {
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch(cartAddItem({
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }))

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    };
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(cartRemoveItem(id))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch(cartSaveShippingAddress(data))

    localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))
}


export const savePaymentMethod = (data) => (dispatch, getState) => {
    dispatch(cartSavePaymentMethod(data))
    localStorage.setItem('paymentMethod', JSON.stringify(getState().cart.paymentMethod))
}