import React from 'react';

export const useManipulators = () => {
  const getFollowingUsernames = (following) =>
    following?.map((user) => user.username) || [];

  return { getFollowingUsernames };
};
