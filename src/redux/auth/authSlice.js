import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { signup, login, editUserProfileService } from './authThunk';

const initialState = {
  user: JSON.parse(localStorage.getItem('cloudSocialUser')),
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      toast.success('Logout successfull.');
      state.user = null;
      localStorage.removeItem('cloudSocialUser');
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.status = 'succeeded';
    },
    [login.rejected]: (state) => {
      state.status = 'failed';
    },
    [signup.pending]: (state) => {
      state.status = 'loading';
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.status = 'succeeded';
    },
    [signup.rejected]: (state) => {
      state.status = 'failed';
    },
    [editUserProfileService.pending]: (state) => {
      state.status = 'loading';
    },
    [editUserProfileService.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
    },
    [editUserProfileService.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
