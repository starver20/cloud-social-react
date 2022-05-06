import axios from 'axios';
import { toast } from 'react-toastify';

export const followUserService = async (
  userDispatch,
  navigate,
  userId,
  jwt
) => {
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
    userDispatch({
      type: 'UPDATE_FOLLOWING',
      payload: { following: response.data.user.following },
    });
  }
};

export const unfollowUserService = async (
  userDispatch,
  navigate,
  userId,
  jwt
) => {
  const response = await axios.post(
    `/api/users/unfollow/${userId}`,
    {},
    {
      headers: { authorization: jwt },
    }
  );

  if (response.status === 200) {
    toast.success('Unfollowed successfully.');
    userDispatch({
      type: 'UPDATE_FOLLOWING',
      payload: { following: response.data.user.following },
    });
  }
};

export const deletePostService = async (
  userDispatch,
  navigate,
  postId,
  jwt
) => {
  const response = await axios.delete(`/api/posts/${postId}`, {
    headers: { authorization: jwt },
  });
  if (response.status === 201) {
    toast.success('Post deleted successfully.');
    userDispatch({
      type: 'UPDATE_POSTS',
      payload: { posts: response.data.posts },
    });
  }
};

export const createPostService = async (userDispatch, navigate, data, jwt) => {
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
    userDispatch({
      type: 'UPDATE_POSTS',
      payload: { posts: response.data.posts },
    });
  }
};

export const editPostService = async (userDispatch, navigate, data, jwt) => {
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
    userDispatch({
      type: 'UPDATE_POSTS',
      payload: { posts: response.data.posts },
    });
  }
};

export const likePostService = async (userDispatch, navigate, postId, jwt) => {
  const response = await axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: { authorization: jwt },
    }
  );
  if (response.status === 201) {
    toast.success('Post liked successfully.');
    userDispatch({
      type: 'UPDATE_POSTS',
      payload: { posts: response.data.posts },
    });
  }
};

export const unlikePostService = async (
  userDispatch,
  navigate,
  postId,
  jwt
) => {
  const response = await axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization: jwt },
    }
  );
  if (response.status === 201) {
    toast.success('Post unliked successfully.');
    userDispatch({
      type: 'UPDATE_POSTS',
      payload: { posts: response.data.posts },
    });
  }
};

export const bookmarkPostService = async (
  userDispatch,
  navigate,
  postId,
  jwt
) => {
  const response = await axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: { authorization: jwt },
    }
  );
  if (response.status === 200) {
    toast.success('Added to bookmarks.');
    userDispatch({
      type: 'UPDATE_BOOKMARKS',
      payload: { bookmarks: response.data.bookmarks },
    });
  }
};

export const unbookmarkPostService = async (
  userDispatch,
  navigate,
  postId,
  jwt
) => {
  const response = await axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization: jwt },
    }
  );
  if (response.status === 200) {
    toast.success('Removed from bookmarks.');
    userDispatch({
      type: 'UPDATE_BOOKMARKS',
      payload: { bookmarks: response.data.bookmarks },
    });
  }
};

export const addCommentService = async (
  userDispatch,
  navigate,
  commentData,
  jwt
) => {
  const response = await axios.post(
    `/api/posts/comment/${commentData.postId}`,
    { comment: commentData.comment },
    {
      headers: { authorization: jwt },
    }
  );

  if (response.status === 201) {
    toast.success('Comment added successfully');
    userDispatch({
      type: 'UPDATE_POSTS',
      payload: { posts: response.data.posts },
    });
  }
};
export const editUserProfileService = async (
  userDispatch,
  navigate,
  profileData,
  jwt
) => {
  const response = await axios.post(
    '/api/users/edit',
    { userData: profileData },
    {
      headers: { authorization: jwt },
    }
  );
};
