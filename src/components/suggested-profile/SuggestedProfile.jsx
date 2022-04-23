import React from 'react';
import classes from './SuggestedProfile.module.css';
import { useAsync } from '../../hooks/useAsync';
import { followUserService } from '../../utils/user-utils';
import { useUser } from '../../context/user/user-context';
import { Oval } from 'react-loader-spinner';
import DotLoader from 'react-spinners/DotLoader';
const SuggestedProfile = ({ username, _id }) => {
  const { userDispatch } = useUser();
  const { callAsyncFunction: followUser, loading } = useAsync(
    followUserService,
    userDispatch,
    _id
  );

  return (
    <>
      <div className={classes.suggestion}>
        <div className={classes['suggested-profile']}>
          <img
            className={`avatar avatar-sm`}
            src="https://pbs.twimg.com/profile_images/1220285531164233729/A98RISKc_200x200.jpg"
            alt="small avatar"
          />
          <span className={classes.username}>{username}</span>
        </div>

        <button
          onClick={() => {
            followUser();
          }}
          className={classes.action}
          disabled={loading}
        >
          Follow
        </button>
      </div>
    </>
  );
};

export default SuggestedProfile;
