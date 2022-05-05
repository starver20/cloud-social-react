import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import classes from './Dashboard.module.css';
import CreatePost from '../../components/create-post/CreatePost';
import SidebarCard from '../../components/card/sidebar-card/SidebarCard';
import SuggestedProfile from '../../components/suggested-profile/SuggestedProfile';
import Post from '../../components/post/Post';
import { useUser } from '../../context/user/user-context';
import { useAuth } from '../../context/auth/auth-context';
import { useManipulators } from '../../hooks/useManipulators';

const Dashboard = () => {
  const {
    user: {
      user: { username, _id: userId },
      jwt,
    },
    logout,
  } = useAuth();
  console.log(userId);

  const [seeAll, setSeeAll] = useState(false);

  const { userDispatch, allPosts, allUsers, following } = useUser();
  const navigate = useNavigate();
  const { getFollowingUsernames, isFollowingUser } = useManipulators();

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

  let isFollowing = isFollowingUser(following, userId);

  // HANDLERS

  const authClickHandler = (e) => {
    // If user is logged in, then log him out and clear the wishlist and cart or else navigate to login
    if (jwt) {
      userDispatch({ type: 'CLEAR_DATA' });
      logout();
      return;
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
            <SidebarCard />
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
                    isFollowing={isFollowing}
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
            <SidebarCard>
              <div className={classes['sidebar-profile']}>
                <div className={classes.profile}>
                  <img
                    className={`avatar avatar-md ${classes.profile}`}
                    src="https://pbs.twimg.com/profile_images/1220285531164233729/A98RISKc_200x200.jpg"
                    alt="medium avatar"
                  />
                  <span className={classes.username}>{username}</span>
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
                  <SuggestedProfile key={suggestion._id} {...suggestion} />
                ))}
              </div>
            </SidebarCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
