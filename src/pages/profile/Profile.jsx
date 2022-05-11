import React, { useEffect, useState, useRef } from 'react';
import classes from './Profile.module.css';
import Navbar from '../../components/navbar/Navbar';
import getInitials from '../../utils/getInitials';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/user/user-context';
import Post from '../../components/post/Post';
import { useManipulators } from '../../hooks/useManipulators';
import { useAuth } from '../../context/auth/auth-context';
import {
  unfollowUserService,
  followUserService,
  editUserProfileService,
} from '../../utils/user-utils';
import { useAsync } from '../../hooks/useAsync';
import { Modal } from '../../components/modal/Modal';
import ProfilesCard from '../../components/card/profiles-card/ProfilesCard';
import SuggestedProfile from '../../components/suggested-profile/SuggestedProfile';

const Profile = () => {
  // Name initials for profile picture
  const [initials, setinitials] = useState('');
  // user data of current profile
  const [profileUser, setProfileUser] = useState({});
  const [active, setActive] = useState('posts');
  // current profile posts
  const [userPosts, setUserPosts] = useState([]);
  // Is loggedin user and current profile user the same?
  const [isAuthUserProfile, setIsAuthUserProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [deleteImageToken, setDeleteImageToken] = useState('');

  const [editProfileData, setEditProfileData] = useState({
    bio: profileUser.bio,
    portfolioUrl: profileUser.portfolioUrl,
    displayPicture: profileUser.displayPicture,
  });

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
      setIsAuthUserProfile(responseUser._id == authUserId);
    })();
  }, [userId, allPosts, following]);

  const { callAsyncFunction: unfollowUser, loading: unfollowLoading } =
    useAsync(unfollowUserService, userDispatch, profileUser._id);

  const { callAsyncFunction: followUser, loading: followLoading } = useAsync(
    followUserService,
    userDispatch,
    profileUser._id
  );

  const { callAsyncFunction: editUserProfile, loading: editProfileLoading } =
    useAsync(editUserProfileService, userDispatch, editProfileData);

  const actionClickHandler = () => {
    if (isAuthUserProfile) {
      // Edit profile logic
      toggleEditingProfile();
    } else if (isFollowing) {
      // Unfollow
      unfollowUser();
    } else {
      // Follow
      followUser();
    }
  };

  const saveClickHandler = async () => {
    toggleEditingProfile();
    editUserProfile();

    let response = await axios.get(`/api/users/${userId}`);
    let responseUser = response.data.user;
    setProfileUser(responseUser);

    setEditProfileData({
      bio: responseUser.bio,
      portfolioUrl: responseUser.portfolioUrl,
    });
  };

  const toggleEditingProfile = () => {
    setIsEditingProfile((prev) => !prev);
  };

  // Image

  const deleteImage = async () => {
    let res = await fetch(
      `https://api.cloudinary.com/v1_1/dq81bdilo/delete_by_token/?token=${deleteImageToken}`,
      {
        method: 'POST',
      }
    );
    setDeleteImageToken('');
  };
  const imageInputRef = useRef();

  const addImageHandler = () => {
    imageInputRef.current.click();
  };

  const imageChangeHandler = async (e) => {
    // If user selects any other image, delete previous selected image from cloudinary
    if (deleteImageToken !== '' && !isEditing) {
      await deleteImage();
    }

    let imageToUpload = e.target.files[0];
    const formData = new FormData();
    formData.append('file', imageToUpload);
    formData.append('upload_preset', 'cloudsocial');
    formData.append('cloud_name', 'dq81bdilo');
    let res = await fetch(
      'https://api.cloudinary.com/v1_1/dq81bdilo/image/upload/',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    setEditProfileData((prev) => ({ ...prev, displayPicture: data.url }));
    setDeleteImageToken(data.delete_token);
  };

  return (
    <div>
      <Navbar />
      <div className={classes['main-content']}>
        <div className={classes.banner}>
          <div className={classes.hero}>
            <h1>Hello {profileUser.firstName}, what's on your mind today?</h1>
            <div className={classes.img}>
              {profileUser.displayPicture ? (
                <img
                  className={classes['display-picture']}
                  src={profileUser.displayPicture}
                />
              ) : (
                <span>{initials}</span>
              )}
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
                {profileUser.bio ? (
                  <p className={classes.bio}>{profileUser.bio}</p>
                ) : null}
                {profileUser.portfolioUrl ? (
                  <a
                    className={classes.portfolio}
                    href={profileUser.portfolioUrl}
                    target="_blank"
                  >
                    {profileUser.portfolioUrl}
                  </a>
                ) : null}
              </div>
            </div>
            <div className={classes.tabs}>
              <span
                onClick={() => {
                  setActive('followers');
                }}
                className={classes.tab}
              >{`${profileUser?.followers?.length} ${
                userPosts.length > 1 ? 'Followers' : 'Follower'
              }`}</span>
              <span
                onClick={() => {
                  setActive('following');
                }}
                className={classes.tab}
              >{`${profileUser?.following?.length} Following`}</span>
              <span className={classes.tab}>{`${userPosts.length} ${
                userPosts.length > 1 ? 'Posts' : 'Post'
              }`}</span>
            </div>
          </div>
          <button
            onClick={actionClickHandler}
            className={classes.action}
            disabled={unfollowLoading || followLoading}
          >
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
      {isEditingProfile && (
        <Modal onClick={toggleEditingProfile}>
          <div className={classes.pictures}>
            <div className={classes.banner}>
              <div className={classes.hero}>
                <h1>
                  Hello {profileUser.firstName}, what's on your mind today?
                </h1>
                <div onClick={addImageHandler} className={classes.dp}>
                  {profileUser.displayPicture ? (
                    <img
                      className={classes['display-picture']}
                      src={profileUser.displayPicture}
                    />
                  ) : (
                    <span onClick={addImageHandler}>{initials}</span>
                  )}
                  <div className={classes.camera}>
                    <input
                      style={{ display: 'none' }}
                      onChange={imageChangeHandler}
                      ref={imageInputRef}
                      type="file"
                    />
                    <svg
                      className="w-6 h-6"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.edit}>
            <label htmlFor="">Bio</label>
            <textarea
              onChange={(e) => {
                setEditProfileData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
              value={editProfileData.bio}
              rows={4}
              type="text"
            />
            <label htmlFor="">Portfolio URL</label>
            <input
              onChange={(e) => {
                setEditProfileData((prev) => ({
                  ...prev,
                  portfolioUrl: e.target.value,
                }));
              }}
              value={editProfileData.portfolioUrl}
              type="text"
            />
            <button onClick={saveClickHandler} className={classes.action}>
              Save
            </button>
          </div>
        </Modal>
      )}
      {active === 'followers' && profileUser.followers.length > 0 ? (
        <Modal
          onClick={() => {
            setActive('');
          }}
        >
          <ProfilesCard>
            <div className={classes.suggestions}>
              {profileUser.followers.map((suggestion) => (
                <SuggestedProfile key={suggestion._id} {...suggestion} />
              ))}
            </div>
          </ProfilesCard>
        </Modal>
      ) : null}
      {active === 'following' && profileUser.following.length > 0 ? (
        <Modal
          onClick={() => {
            setActive('');
          }}
        >
          <ProfilesCard>
            <div className={classes.suggestions}>
              {profileUser.following.map((suggestion) => (
                <SuggestedProfile
                  key={suggestion._id}
                  isFollowing={true}
                  {...suggestion}
                />
              ))}
            </div>
          </ProfilesCard>
        </Modal>
      ) : null}
    </div>
  );
};

export default Profile;
