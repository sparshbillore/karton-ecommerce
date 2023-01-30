import { login } from './userLoginSlice';
import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');




export const USER_REGISTER_STATUSES = Object.freeze({
    SUCCESS: 'success',
    FAIL: 'fail',
    REQUEST: 'request',
});



const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState: {
        userInfo : null,
        status : null,
    } , 
    reducers: {
        registerUser(state, action) {
            state.userInfo = action.payload;
        },
        userLogout(state) {
            state.userInfo = null
            
        },

        registerStatus(state, action){
            state.status = action.payload;
        },
    },
});

export const { registerUser, registerStatus , userLogout } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;



export const register = (name , email, password) => async (dispatch) => {

    dispatch(registerStatus(USER_REGISTER_STATUSES.REQUEST))
    try {
        

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )


        dispatch(registerStatus(USER_REGISTER_STATUSES.SUCCESS))
        dispatch(registerUser(data))
        
        dispatch(login(email , password))


    } catch (error) {
            dispatch(registerStatus(USER_REGISTER_STATUSES.FAIL))
    }
}


export const logout = () => (dispatch) => {
        localStorage.removeItem('userInfo')
        dispatch(userLogout())
        dispatch(registerStatus(null))
}


