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
  // console.log(response);

  if (response.status === 200) {
    userDispatch({
      type: 'UPDATE_FOLLOWING',
      payload: { following: response.data.user.following },
    });
  }
};
