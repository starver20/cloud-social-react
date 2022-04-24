import axios from 'axios';

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
    userDispatch({
      type: 'UPDATE_FOLLOWING',
      payload: { following: response.data.user.following },
    });
  }
};
