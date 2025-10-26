import axios from 'axios';
import { loginuser } from './userLoginSlice';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');





const userUpdateProfile = createSlice({
    name: 'userUpdateProfile',
    initialState: {},
    reducers: {
        userUpdateProfileRequest(state){
            state.loading = true
        },
        userUpdateProfileSuccess(state, action){
            state.loading = false
            state.success = true
            state.userInfo = action.payload
        },
        userUpdateProfileFail(state, action){
            state.loading = false
            state.error = action.payload
        },

        userUpdateProfileReset(state){
            state = {}
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(userUpdateProfile.pending, (state, action) => {
    //             state.loading = true
    //         })
    //         .addCase(userUpdateProfile.fulfilled, (state, action) => {
    //             state.loading = false
    //             state.success = true
    //             state.order = action.payload
    //         })
    //         .addCase(userUpdateProfile.rejected, (state, action) => {
    //             state.loading = false
    //             state.error = action.payload
    //         })
    // },
})

export const {userUpdateProfileRequest, userUpdateProfileFail, userUpdateProfileSuccess, userUpdateProfileReset } = userUpdateProfile.actions;
export default userUpdateProfile.reducer;


// Thunks
export const updateUserProfile = createAsyncThunk('user/userUpdateProfile', async (user, thunkAPI) => {
   
    try {
        thunkAPI.dispatch(userUpdateProfileRequest());
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
            `/api/users/profile/`,
            user,
            config
        )

        thunkAPI.dispatch(userUpdateProfileSuccess(data))
        thunkAPI.dispatch(loginuser(data))
        localStorage.setItem('userInfo', JSON.stringify(data))

        return data
        } catch (error) {
                const payload = (error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message)
                thunkAPI.dispatch(userUpdateProfileFail(payload));
            }
        });


// export function userUpdateProfileAction() {
//     return async function userUpdateProfileThunk(order, dispatch) {
//         dispatch(userUpdateProfile(order))
//         dispatch(clearCartItems())
//         localStorage.removeItem('cartItems')
//     };
// }


