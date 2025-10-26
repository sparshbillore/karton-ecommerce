import { configureStore } from '@reduxjs/toolkit'
import productListReducer from '../redux/products/productListSlice'
import productDetailReducer from '../redux/products/productDetailSlice'
import productCreateReviewReducer from './products/productReviewCreateSlice'
import cartReducer from '../redux/cart/cartSlice'
import userLoginReducer from './user/userLoginSlice'
import userRegisterReducer from './user/userRegisterSlice'
import userDetailReducer from './user/userDetailSlice'
import orderCreateReducer from './orders/orderCreateSlice'
import orderDetailReducer from './orders/orderDetailSlice'
import orderPayReducer from './orders/orderPaySlice'
import userUpdateProfileReducer from './user/userUpdateProfileSlice'
import orderListMyReducer from './orders/orderListMySlice'


export const store = configureStore({
  reducer: {
    productList : productListReducer,
    productDetails: productDetailReducer,
    productReviewCreate: productCreateReviewReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailReducer,
    orderPay : orderPayReducer,
    ordersListMy : orderListMyReducer,
  },
})


export default store;