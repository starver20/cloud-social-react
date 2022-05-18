import React from 'react';
import Story from '../story/Story';
import AddStory from '../AddStory';
import classes from './Stories.module.css';
import { useSelector } from 'react-redux';

const Stories = () => {
  const {
    user: { username, _id: userId },
    jwt,
  } = useSelector((state) => state.auth.user);
  const { allUsers, following } = useSelector((state) => state.user);

  const userWithStories = following.filter((user) => user.stories.length != 0);
  const authUser = allUsers.filter((user) => user.username == username)[0];
  if (authUser?.stories?.length > 0) {
    userWithStories.unshift(authUser);
  }

  return (
    <div className={classes['stories-container']}>
      {/* <AddStory />  implement logic later */}
      {userWithStories.map((user) => (
        <Story user={user} />
      ))}
    </div>
  );
};

export default Stories;
