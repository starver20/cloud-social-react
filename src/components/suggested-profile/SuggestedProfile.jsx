import React, { useState } from 'react';
import classes from './SuggestedProfile.module.css';
import { useAsync } from '../../hooks/useAsync';
import getInitials from '../../utils/getInitials';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  followUserService,
  unfollowUserService,
} from '../../redux/user/userThunk';

const SuggestedProfile = ({ username, _id, isFollowing }) => {
  const dispatch = useDispatch();

  const { allUsers } = useSelector((state) => state.user);

  const curUser = allUsers.find((curUser) => curUser.username === username);

  const [initials, setinitials] = useState(
    curUser ? getInitials(curUser.firstName, curUser.lastName) : ''
  );

  const { callAsyncFunction: followUser, loading: followLoading } = useAsync(
    followUserService,
    dispatch,
    _id
  );

  const { callAsyncFunction: unfollowUser, loading: unfollowLoading } =
    useAsync(unfollowUserService, dispatch, _id);

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
