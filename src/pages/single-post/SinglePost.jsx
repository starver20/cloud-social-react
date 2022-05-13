import React from 'react';
import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { postId } = useParams();
  console.log(postId);

  return <div>{postId}</div>;
};

export default SinglePost;
