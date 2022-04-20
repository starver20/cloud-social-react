import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import classes from './Dashboard.module.css';
import NewPost from '../../components/new-post/NewPost';
import SidebarCard from '../../components/card/sidebar-card/SidebarCard';
import SuggestedProfile from '../../components/suggested-profile/SuggestedProfile';
import Post from '../../components/post/Post';
import { useUser } from '../../context/user/user-context';

const Dashboard = () => {
  const { allPosts } = useUser();
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
            {allPosts.length > 0
              ? allPosts.map((post) => <Post key={post.id} {...post} />)
              : null}
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
                <span className={classes.action}>Logout</span>
              </div>
              <div>
                <div className={classes['suggestions-title']}>
                  <span>Suggestions for you</span>
                  <span>See All</span>
                </div>
              </div>
              <div className={classes.suggestions}>
                <SuggestedProfile />
                <SuggestedProfile />
                <SuggestedProfile />
                <SuggestedProfile />
                <SuggestedProfile />
              </div>
            </SidebarCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
