export const useManipulators = () => {
  const getFollowingUsernames = (following) =>
    following?.map((user) => user.username) || [];

  const isFollowingUser = (following, userId) =>
    following.some((user) => user._id == userId);

  return { getFollowingUsernames, isFollowingUser };
};
