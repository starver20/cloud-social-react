import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { initialize } from '../user/userThunk';

export const login = createAsyncThunk('auth/login', async (data) => {
  try {
    let response = await axios.post('/api/auth/login', data.user);
    if (response.status === 200) {
      toast.success('Login successfull.');
      if (data.rememberMe) {
        localStorage.setItem(
          'cloudSocialUser',
          JSON.stringify({
            user: {
              _id: response.data.foundUser._id,
              username: response.data.foundUser.username,
            },
            jwt: response.data.encodedToken,
          })
        );
      }

      return {
        user: {
          _id: response.data.foundUser._id,
          username: response.data.foundUser.username,
        },
        jwt: response.data.encodedToken,
      };
    }
  } catch (err) {
    toast.error('Invalid email or password!');
  }
});

export const signup = createAsyncThunk('auth/signup', async (data) => {
  try {
    const response = await axios.post('/api/auth/signup', data);
    if (response.status === 201) {
      toast.success('Signup successfull.');
      return {
        user: {
          _id: response.data.createdUser._id,
          username: response.data.createdUser.username,
        },
        jwt: response.data.encodedToken,
      };
    }
  } catch (err) {
    console.log(err);
  }
});

export const editUserProfileService = createAsyncThunk(
  'user/editProfile',
  async (profileData) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      '/api/users/edit',
      { userData: profileData },
      {
        headers: { authorization: jwt },
      }
    );
  }
);
