import { createSlice } from '@reduxjs/toolkit';
import {
  initialize,
  followUserService,
  unfollowUserService,
  deletePostService,
  likePostService,
  unlikePostService,
  bookmarkPostService,
  unbookmarkPostService,
  addCommentService,
  createPostService,
  editPostService,
  // editUserProfileService,
} from './userThunk';

const initialState = {
  followers: [],
  following: [],
  allPosts: [],
  allUsers: [],
  userPosts: [],
  bookmarks: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearData: (state) => {
      state.followers = [];
      state.following = [];
      state.allPosts = [];
      state.allUsers = [];
      state.userPosts = [];
      state.bookmarks = [];
    },
  },
  extraReducers: {
    [initialize.pending]: (state) => {
      state.status = 'loading';
    },
    [initialize.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.followers = payload.followers;
      state.following = payload.following;
      state.allPosts = payload.allPosts;
      state.allUsers = payload.allUsers;
      state.userPosts = payload.userPosts;
      state.bookmarks = payload.bookmarks;
    },
    [initialize.rejected]: (state) => {
      state.status = 'failed';
    },
    [followUserService.pending]: (state) => {
      state.status = 'loading';
    },
    [followUserService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.following = payload;
    },
    [followUserService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [unfollowUserService.pending]: (state) => {
      state.status = 'loading';
    },
    [unfollowUserService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.following = payload;
    },
    [unfollowUserService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [deletePostService.pending]: (state) => {
      state.status = 'loading';
    },
    [deletePostService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.allPosts = payload;
    },
    [deletePostService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [likePostService.pending]: (state) => {
      state.status = 'loading';
    },
    [likePostService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.allPosts = payload;
    },
    [likePostService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [unlikePostService.pending]: (state) => {
      state.status = 'loading';
    },
    [unlikePostService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.allPosts = payload;
    },
    [unlikePostService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [bookmarkPostService.pending]: (state) => {
      state.status = 'loading';
    },
    [bookmarkPostService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.bookmarks = payload;
    },
    [bookmarkPostService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [unbookmarkPostService.pending]: (state) => {
      state.status = 'loading';
    },
    [unbookmarkPostService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.bookmarks = payload;
    },
    [unbookmarkPostService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [addCommentService.pending]: (state) => {
      state.status = 'loading';
    },
    [addCommentService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.allPosts = payload;
    },
    [addCommentService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [createPostService.pending]: (state) => {
      state.status = 'loading';
    },
    [createPostService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.allPosts = payload;
    },
    [createPostService.rejected]: (state) => {
      state.status = 'rejected';
    },
    [editPostService.pending]: (state) => {
      state.status = 'loading';
    },
    [editPostService.fulfilled]: (state, { payload }) => {
      state.status = 'loading';
      state.allPosts = payload;
    },
    [editPostService.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});

export const { clearData } = userSlice.actions;
export default userSlice.reducer;
