import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const initialize = createAsyncThunk('user/initialize', async () => {
  const localData = JSON.parse(localStorage.getItem('cloudSocialUser'));

  try {
    let {
      data: { posts },
    } = await axios.get('/api/posts');

    let {
      data: { users },
    } = await axios.get('/api/users');
    // If used api/users above, it results in namespace error while reloading on a page whose url contains params

    if (localData?.user) {
      let {
        data: { user: responseUser },
      } = await axios.get(`/api/users/${localData?.user._id}`);

      const { bookmarks, followers, following, username } = responseUser;

      return {
        followers,
        following,
        allPosts: posts,
        allUsers: users,
        userPosts: posts.filter((post) => post.username === username),
        bookmarks,
      };
    }
  } catch (err) {
    console.log(err);
  }
});

export const followUserService = createAsyncThunk(
  'user/follow',
  async (userId) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));

    const response = await axios.post(
      `/api/users/follow/${userId}`,
      {},
      {
        headers: { authorization: jwt },
      }
    );

    if (response.status === 200) {
      toast.success(
        `Following ${response.data.user.following.reverse()[0].username}.`
      );

      return response.data.user.following;
    }
  }
);

export const unfollowUserService = createAsyncThunk(
  '/user/unfollow',
  async (userId) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/users/unfollow/${userId}`,
      {},
      {
        headers: { authorization: jwt },
      }
    );

    if (response.status === 200) {
      toast.success('Unfollowed successfully.');
      return response.data.user.following;
    }
  }
);

export const deletePostService = createAsyncThunk(
  'user/deletePost',
  async (postId) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.delete(`/api/posts/${postId}`, {
      headers: { authorization: jwt },
    });
    if (response.status === 201) {
      toast.success('Post deleted successfully.');
      return response.data.posts;
    }
  }
);

export const likePostService = createAsyncThunk(
  'user/likePost',
  async (postId) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/posts/like/${postId}`,
      {},
      {
        headers: { authorization: jwt },
      }
    );
    if (response.status === 201) {
      toast.success('Post liked successfully.');
      return response.data.posts;
    }
  }
);

export const unlikePostService = createAsyncThunk(
  'user/unlikePost',
  async (postId) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/posts/dislike/${postId}`,
      {},
      {
        headers: { authorization: jwt },
      }
    );
    if (response.status === 201) {
      toast.success('Like removed successfully.');
      return response.data.posts;
    }
  }
);

export const bookmarkPostService = createAsyncThunk(
  'user/addBookmark',
  async (postId) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/users/bookmark/${postId}`,
      {},
      {
        headers: { authorization: jwt },
      }
    );
    if (response.status === 200) {
      toast.success('Added to bookmarks.');
      return response.data.bookmarks;
    }
  }
);
export const unbookmarkPostService = createAsyncThunk(
  'user/removeBookmark',
  async (postId) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/users/remove-bookmark/${postId}`,
      {},
      {
        headers: { authorization: jwt },
      }
    );
    if (response.status === 200) {
      toast.success('Added to bookmarks.');
      return response.data.bookmarks;
    }
  }
);

export const addCommentService = createAsyncThunk(
  'user/addComment',
  async (commentData) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/posts/comment/${commentData.postId}`,
      { comment: commentData.comment },
      {
        headers: { authorization: jwt },
      }
    );

    if (response.status === 201) {
      toast.success('Comment added successfully');
      return response.data.posts;
    }
  }
);

export const createPostService = createAsyncThunk(
  'user/createPost',
  async (data) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/posts`,
      {
        postData: { content: data.content, url: data.url },
      },
      {
        headers: { authorization: jwt },
      }
    );

    if (response.status === 201) {
      toast.success('Post created successfully.');
      return response.data.posts;
    }
  }
);

export const editPostService = createAsyncThunk(
  'user/editPost',
  async (data) => {
    const { jwt } = JSON.parse(localStorage.getItem('cloudSocialUser'));
    const response = await axios.post(
      `/api/posts/edit/${data.postId}`,
      {
        postData: { content: data.content, url: data.url },
      },
      {
        headers: { authorization: jwt },
      }
    );
    if (response.status === 201) {
      toast.success('Post edited successfully.');
      return response.data.posts;
    }
  }
);
