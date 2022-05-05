import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';
import Navbar from '../../components/navbar/Navbar';
import getInitials from '../../utils/getInitials';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/user/user-context';
import Post from '../../components/post/Post';
import { useManipulators } from '../../hooks/useManipulators';
import { useAuth } from '../../context/auth/auth-context';
import { unfollowUserService, followUserService } from '../../utils/user-utils';
import { useAsync } from '../../hooks/useAsync';
import { Modal } from '../../components/modal/Modal';

const Profile = () => {
  const [initials, setinitials] = useState('');
  const [profileUser, setProfileUser] = useState({});
  const [active, setActive] = useState('posts');
  const [userPosts, setUserPosts] = useState([]);
  const [isAuthUserProfile, setIsAuthUserProfile] = useState(false);

  const { allPosts, following, userDispatch } = useUser();
  const { userId } = useParams();
  const { isFollowingUser } = useManipulators();
  const {
    user: {
      user: { _id: authUserId },
    },
  } = useAuth();

  let isFollowing = isFollowingUser(following, userId);

  useEffect(() => {
    (async () => {
      let response = await axios.get(`/api/users/${userId}`);
      let responseUser = response.data.user;

      let posts = allPosts.filter(
        (post) => post.username === responseUser.username
      );

      setinitials(getInitials(responseUser.firstName, responseUser.lastName));
      setProfileUser(responseUser);
      setUserPosts(posts);
      // To check if profile belongs to currently logged-in user
      setIsAuthUserProfile(profileUser._id == authUserId);
    })();
  }, [userId, allPosts]);

  const { callAsyncFunction: unfollowUser, unfollowLoading } = useAsync(
    unfollowUserService,
    userDispatch,
    profileUser._id
  );

  const { callAsyncFunction: followUser, followLoading } = useAsync(
    followUserService,
    userDispatch,
    profileUser._id
  );

  const actionClickHandler = () => {
    if (isAuthUserProfile) {
      // Edit profile logic
    } else if (isFollowing) {
      // Unfollow
      unfollowUser();
    } else {
      // Follow
      followUser();
    }
  };

  return (
    <div>
      <Navbar />
      <div className={classes['main-content']}>
        <div className={classes.banner}>
          <div className={classes.hero}>
            <h1>Hello {profileUser.firstName}, what's on your mind today?</h1>
            <div className={classes.img}>
              <span>{initials}</span>
            </div>
          </div>
        </div>
        <section className={classes.section}>
          <div className={classes['container']}>
            <div>
              <span className={classes['title']}>
                {profileUser.firstName + ' ' + profileUser.lastName}
              </span>
              <div className={classes['profile-info']}>
                {profileUser.bio ? <p className={classes.bio}>Bio</p> : null}
                {profileUser.portfolio ? (
                  <a
                    className={classes.portfolio}
                    href={profileUser.portfolio}
                    target="_blank"
                  >
                    Portfolio URL
                  </a>
                ) : null}
              </div>
            </div>
            <div className={classes.tabs}>
              <span className={classes.tab}>{`${
                profileUser?.followers?.length
              } ${userPosts.length > 1 ? 'Followers' : 'Follower'}`}</span>
              <span
                className={classes.tab}
              >{`${profileUser?.following?.length} Following`}</span>
              <span className={classes.tab}>{`${userPosts.length} ${
                userPosts.length > 1 ? 'Posts' : 'Post'
              }`}</span>
            </div>
          </div>
          <button onClick={actionClickHandler} className={classes.action}>
            {isAuthUserProfile
              ? 'Edit Profile'
              : isFollowing
              ? 'Unfollow'
              : 'Follow'}
          </button>
        </section>
        <section className={classes.content}>
          {userPosts.length > 0
            ? userPosts
                .reverse()
                .map((post) => (
                  <Post
                    key={post.id}
                    isUserPost={isAuthUserProfile}
                    isFollowing={isFollowing}
                    {...post}
                  />
                ))
            : null}
        </section>
      </div>
    </div>
  );
};

export default Profile;
