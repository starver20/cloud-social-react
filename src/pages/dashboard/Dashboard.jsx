import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import classes from './Dashboard.module.css';
import CreatePost from '../../components/create-post/CreatePost';
import ProfilesCard from '../../components/card/profiles-card/ProfilesCard';
import SuggestedProfile from '../../components/suggested-profile/SuggestedProfile';
import Post from '../../components/post/Post';
import { logout } from '../../redux/auth/authSlice';
import { useManipulators } from '../../hooks/useManipulators';
import getInitials from '../../utils/getInitials';
import { initialize } from '../../redux/user/userThunk';
import { useSelector, useDispatch } from 'react-redux';
import { clearData } from '../../redux/user/userSlice';

const Dashboard = () => {
  const {
    user: { username, _id: userId },
    jwt,
  } = useSelector((state) => state.auth.user);

  const { allPosts, allUsers, following } = useSelector((state) => state.user);

  // console.log(allPosts);
  // console.log(following);

  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(initialize());
    })();
  }, []);

  const authUser = allUsers.find((curUser) => curUser.username === username);

  const initials = authUser
    ? getInitials(authUser.firstName, authUser.lastName)
    : '';

  const [seeAll, setSeeAll] = useState(false);

  const navigate = useNavigate();
  const { getFollowingUsernames } = useManipulators();

  const followingUsernames = getFollowingUsernames(following);

  const followingPosts = allPosts.filter(
    (post) =>
      followingUsernames.includes(post.username) || post.username === username
  );

  const suggestions = allUsers
    ?.filter(
      (otherUser) =>
        !followingUsernames?.includes(otherUser.username) &&
        otherUser.username !== username
    )
    .slice(0, seeAll ? allUsers.length : 5);

  // HANDLERS

  const authClickHandler = (e) => {
    // If user is logged in, then log him out and clear the wishlist and cart or else navigate to login
    if (jwt) {
      dispatch(clearData());
      dispatch(logout());
    }
    navigate('/login');
  };

  const toggleSeeAll = () => setSeeAll((prevState) => !prevState);

  return (
    <div>
      <Navbar />
      <div className={classes['main-content']}>
        <div className={classes.main}>
          {/* <div className={`${classes['left-sidebar']} ${classes.sidebar}`}>
            <ProfilesCard />
          </div> */}
          <div className={classes.timeline}>
            <CreatePost />
            {followingPosts.length > 0 ? (
              followingPosts
                .reverse()
                .map((post) => (
                  <Post
                    key={post.id}
                    {...post}
                    isFollowing={true}
                    isUserPost={post.username === username}
                  />
                ))
            ) : (
              <h1 className={classes.nopost}>
                Follow people to see what they post!
              </h1>
            )}
          </div>
          <div className={`${classes['right-sidebar']} ${classes.sidebar}`}>
            <ProfilesCard>
              <div className={classes['sidebar-profile']}>
                <div className={classes.profile}>
                  <div className={classes.dp}>
                    {authUser &&
                      (authUser.displayPicture ? (
                        <img
                          className={classes['display-picture']}
                          src={authUser.displayPicture}
                        />
                      ) : (
                        <span>{initials}</span>
                      ))}
                  </div>
                  <Link to={`/p/${userId}`} className={classes.username}>
                    {username}
                  </Link>
                </div>
                <button onClick={authClickHandler} className={classes.action}>
                  Logout
                </button>
              </div>
              <div>
                {suggestions.length > 0 ? (
                  <div className={classes['suggestions-title']}>
                    <span>Suggestions for you</span>
                    <span onClick={toggleSeeAll}>See All</span>
                  </div>
                ) : null}
              </div>
              <div className={classes.suggestions}>
                {suggestions.map((suggestion) => (
                  <SuggestedProfile
                    key={suggestion._id}
                    isFollowing={false}
                    {...suggestion}
                  />
                ))}
              </div>
            </ProfilesCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
