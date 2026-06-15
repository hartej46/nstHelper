import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userInfo } from "../service/service";

export const fetchUser = createAsyncThunk('user/me', async() => {
    try {
      const response = await userInfo();
      return response?.data;
    } catch (error) {
      throw error.response?.data?.message || "User fetch failed";
    }
})

const initialState = {
    isLoggedin: false,
    userData: null,
    isCheckingSession: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) => {
            state.isLoggedin = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.isLoggedin = false;
            state.userData = null;
        }        
    },
    extraReducers:(builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isCheckingSession = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoggedin = true;
        state.userData = action.payload;
        state.isCheckingSession = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoggedin = false;
        state.userData = null;
        state.isCheckingSession = false;
      });
  }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;