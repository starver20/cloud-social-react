import React from 'react';
import classes from './story/Story.module.css';
import { useSelector } from 'react-redux';

const AddStory = () => {
  // Add user story
  const {
    user: { username, _id: userId },
    jwt,
  } = useSelector((state) => state.auth.user);
  const { allPosts, allUsers, following } = useSelector((state) => state.user);

  const authUser = allUsers.find((curUser) => curUser.username === username);
  return (
    <div class={`badge-container ${classes['add-story-container']}`}>
      <img
        class="avatar avatar-lg"
        src="https://bit.ly/dan-abramov"
        alt="medium logo"
      />
      <span class={`badge badge-lg online ${classes.badge}`}>
        <svg
          className={`w-6 h-6 ${classes['badge-svg']}`}
          fill={`var(--light-background-color)`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            strokeWidth="10"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default AddStory;
