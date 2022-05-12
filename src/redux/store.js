import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
  },
});
