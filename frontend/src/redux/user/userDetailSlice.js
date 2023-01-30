import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    user: {},
  },
  reducers: {
    userDetailRequest(state, action) {
      state.loading = true
    },

    userDetailSuccess(state, action) {
      state.loading = false
      state.user = action.payload;
    },

    userDetailFail(state, action) {
      state.loading = false
      state.Error = action.payload;
    },

    userDetailReset(state){
      state = {
        user : {},
      }
    }
  },
});

export const { userDetailRequest, userDetailFail, userDetailSuccess, userDetailReset } = userDetailSlice.actions;
export default userDetailSlice.reducer;



export const fetchUserDetails = createAsyncThunk('user/userDetails', async(arg, thunkAPI) => {

  thunkAPI.dispatch(userDetailRequest());
  try {
      const {
          userLogin: { userInfo },
      } = thunkAPI.getState()

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/users/profile/`, config);

      thunkAPI.dispatch(userDetailSuccess(data))

      
      } catch (error) {
              const payload = (error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message)
              thunkAPI.dispatch(userDetailFail(payload));
          }
      });



