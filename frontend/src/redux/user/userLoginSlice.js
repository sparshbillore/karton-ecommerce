import axios from 'axios';
import { orderListMyReset } from '../orders/orderListMySlice';
const { createSlice } = require('@reduxjs/toolkit');




export const USER_LOGIN_STATUSES = Object.freeze({
    SUCCESS: 'success',
    FAIL: 'fail',
    REQUEST: 'request',
});


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        userInfo: userInfoFromStorage,
        status: null,
    },
    reducers: {
        loginuser(state, action) {
            state.userInfo = action.payload;
        },
        userLogout(state) {
            state.userInfo = null
            
        },

        userLoginStatus(state, action){
            state.status = action.payload;
        },
    },
});

export const { loginuser, userLogout , userLoginStatus } = userLoginSlice.actions;
export default userLoginSlice.reducer;



export const login = (email, password) => async (dispatch) => {

    dispatch(userLoginStatus(USER_LOGIN_STATUSES.REQUEST))
    try {
        

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch(userLoginStatus(USER_LOGIN_STATUSES.SUCCESS))
        dispatch(loginuser(data))


        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
            dispatch(userLoginStatus(USER_LOGIN_STATUSES.FAIL))
    }
}


export const logout = () => (dispatch) => {
        localStorage.removeItem('userInfo')
        dispatch(userLogout())
        dispatch(userLoginStatus(null))
        dispatch(orderListMyReset())
}


