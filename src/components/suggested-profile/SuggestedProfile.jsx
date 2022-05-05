import React from 'react';
import classes from './SuggestedProfile.module.css';
import { useAsync } from '../../hooks/useAsync';
import { followUserService } from '../../utils/user-utils';
import { useUser } from '../../context/user/user-context';
import { Link } from 'react-router-dom';

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
          <Link to={`/p/${_id}`} className={classes.username}>
            {username}
          </Link>
        </div>

        <button
          onClick={followUser}
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
