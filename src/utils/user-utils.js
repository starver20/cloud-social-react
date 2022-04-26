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

  console.log(response);

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
    toast.success(`Unfollowed successfully.`);
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
    toast.success(`Post deleted successfully.`);
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
      postData: { content: data.content },
    },
    {
      headers: { authorization: jwt },
    }
  );

  if (response.status === 201) {
    toast.success(`Post created successfully.`);
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
      postData: { content: data.content },
    },
    {
      headers: { authorization: jwt },
    }
  );
  if (response.status === 201) {
    toast.success(`Post edited successfully.`);
    userDispatch({
      type: 'UPDATE_POSTS',
      payload: { posts: response.data.posts },
    });
  }
};
