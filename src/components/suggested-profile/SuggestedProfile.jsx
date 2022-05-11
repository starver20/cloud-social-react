import React, { useState } from 'react';
import classes from './SuggestedProfile.module.css';
import { useAsync } from '../../hooks/useAsync';
import { followUserService, unfollowUserService } from '../../utils/user-utils';
import { useUser } from '../../context/user/user-context';
import { useAuth } from '../../context/auth/auth-context';
import getInitials from '../../utils/getInitials';
import { Link } from 'react-router-dom';

const SuggestedProfile = ({ username, _id, isFollowing }) => {
  const { userDispatch, allUsers } = useUser();

  const {
    user: { user },
  } = useAuth();

  const curUser = allUsers.find((curUser) => curUser.username === username);

  const [initials, setinitials] = useState(
    curUser ? getInitials(curUser.firstName, curUser.lastName) : ''
  );

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
          <div className={classes.dp}>
            {curUser &&
              (curUser.displayPicture ? (
                <img
                  className={classes['display-picture']}
                  src={curUser.displayPicture}
                />
              ) : (
                <span>{initials}</span>
              ))}
          </div>
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
