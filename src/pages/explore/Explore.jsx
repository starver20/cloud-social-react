import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import classes from './Explore.module.css';
import ProfilesCard from '../../components/card/profiles-card/ProfilesCard';
import SuggestedProfile from '../../components/suggested-profile/SuggestedProfile';
import Post from '../../components/post/Post';
import { logout } from '../../redux/auth/authSlice';
import { useManipulators } from '../../hooks/useManipulators';
import getInitials from '../../utils/getInitials';
import { useSelector, useDispatch } from 'react-redux';
import { clearData } from '../../redux/user/userSlice';

const perPage = 2;

const Explore = () => {
  const {
    user: { username, _id: userId },
    jwt,
  } = useSelector((state) => state.auth.user);

  const { allPosts, allUsers, following } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const authUser = allUsers.find((curUser) => curUser.username === username);

  const [initials, setinitials] = useState(
    authUser ? getInitials(authUser.firstName, authUser.lastName) : ''
  );

  const [seeAll, setSeeAll] = useState(false);

  const navigate = useNavigate();
  const { getFollowingUsernames } = useManipulators();

  const followingUsernames = getFollowingUsernames(following);

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

  // infinite scrolling, currently no api calls, just slicing out posts from allPosts

  const [lastElement, setLastElement] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [maxPages, setMaxPages] = useState(
    Math.ceil(allPosts.length / perPage)
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        if (pageNum < maxPages) {
          setPageNum((page) => page + 1);
        }
      }
    },
    { threshold: 1 }
  );

  useEffect(() => {
    const currentElement = lastElement;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    setMaxPages(Math.ceil(allPosts.length / perPage));
  }, [allPosts]);

  return (
    <div>
      <Navbar />
      <div className={classes['main-content']}>
        <div className={classes.main}>
          <div className={classes.timeline}>
            {allPosts.length > 0 ? (
              allPosts.slice(0, pageNum * perPage).map((post, index) => {
                return index ==
                  allPosts.slice(0, pageNum * perPage).length - 1 ? (
                  <div key={post.id} ref={setLastElement}>
                    <Post
                      {...post}
                      isFollowing={true}
                      isUserPost={post.username === username}
                      isFollowing={followingUsernames.includes(post.username)}
                    />
                  </div>
                ) : (
                  <Post
                    key={post.id}
                    {...post}
                    isFollowing={true}
                    isUserPost={post.username === username}
                    isFollowing={followingUsernames.includes(post.username)}
                  />
                );
              })
            ) : (
              <h1 className={classes.nopost}>Things are quiet around here!</h1>
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

export default Explore;
