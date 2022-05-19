import React, { useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import classes from './SinglePost.module.css';

const SinglePost = () => {
  const [curPost, setCurPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('Loading...');

  const { postId } = useParams();

  const user = useSelector((state) => state.auth.user);

  const { allPosts } = useSelector((state) => state.user);

  useEffect(() => {
    if (allPosts.length == 0) return;
    setLoading(true);
    let posts = allPosts.filter((post) => post._id == postId);
    if (posts.length == 0) {
      setMsg('Post not available.');
      return;
    }
    setCurPost(posts[0]);
    setLoading(false);
  }, [allPosts]);

  return (
    <div>
      <Navbar />
      <div className={classes['main-content']}>
        <div className={classes.main}>
          <div className={classes.timeline}>
            {!loading ? (
              <Post
                key={curPost.id}
                {...curPost}
                isFollowing={true}
                isUserPost={curPost.username === user?.username}
                singlePost={true}
              />
            ) : (
              <p style={{ textAlign: 'center', fontSize: 'var(--header-2)' }}>
                {msg}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
