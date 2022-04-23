import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import classes from './Dashboard.module.css';
import NewPost from '../../components/new-post/NewPost';
import SidebarCard from '../../components/card/sidebar-card/SidebarCard';
import SuggestedProfile from '../../components/suggested-profile/SuggestedProfile';
import Post from '../../components/post/Post';
import { useUser } from '../../context/user/user-context';
import { useAuth } from '../../context/auth/auth-context';
import { useManipulators } from '../../hooks/useManipulators';

const Dashboard = () => {
  const {
    user: {
      user: { username },
      jwt,
    },
    logout,
  } = useAuth();
  const { userDispatch, followingPosts, allUsers, following } = useUser();
  const navigate = useNavigate();

  const authClickHandler = (e) => {
    // If user is logged in, then log him out and clear the wishlist and cart or else navigate to login
    if (jwt) {
      userDispatch({ type: 'CLEAR_DATA' });
      logout();
      return;
    }
    navigate('/login');
  };

  const [seeAll, setSeeAll] = useState(false);

  const { getFollowingUsernames } = useManipulators();

  const toggleSeeAll = () => setSeeAll((prevState) => !prevState);

  const followingUsernames = getFollowingUsernames(following);

  const suggestions = allUsers
    ?.filter(
      (otherUser) =>
        !followingUsernames?.includes(otherUser.username) &&
        otherUser.username !== username
    )
    .slice(0, seeAll ? allUsers.length : 5);

  return (
    <div>
      <Navbar />
      <div className={classes['main-content']}>
        <div className={classes.main}>
          {/* <div className={`${classes['left-sidebar']} ${classes.sidebar}`}>
            <SidebarCard />
          </div> */}
          <div className={classes.timeline}>
            <NewPost />
            {followingPosts.length > 0 ? (
              followingPosts.map((post) => <Post key={post.id} {...post} />)
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
                  <span className={classes.username}>amar_narute</span>
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
