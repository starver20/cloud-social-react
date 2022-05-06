import React from 'react';
import classes from './SuggestedProfile.module.css';
import { useAsync } from '../../hooks/useAsync';
import { followUserService, unfollowUserService } from '../../utils/user-utils';
import { useUser } from '../../context/user/user-context';
import { Link } from 'react-router-dom';

const SuggestedProfile = ({ username, _id, isFollowing }) => {
  const { userDispatch } = useUser();

  const { callAsyncFunction: followUser, loading: followLoading } = useAsync(
    followUserService,
    userDispatch,
    _id
  );

  const { callAsyncFunction: unfollowUser, loading: unfollowLoading } =
    useAsync(unfollowUserService, userDispatch, _id);

  const clickHandler = () => {
    if (isFollowing) {
      unfollowUser();
    } else {
      followUser();
    }
  };

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
          onClick={clickHandler}
          className={classes.action}
          disabled={followLoading || unfollowLoading}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </>
  );
};

export default SuggestedProfile;
