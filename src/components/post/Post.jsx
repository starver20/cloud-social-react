import React, { useState, useRef, useEffect } from 'react';
import classes from './Post.module.css';
import { useAsync } from '../../hooks/useAsync';
import { Link } from 'react-router-dom';
import getInitials from '../../utils/getInitials';
import { useNavigate } from 'react-router-dom';
import {
  followUserService,
  unfollowUserService,
  deletePostService,
  likePostService,
  unlikePostService,
  bookmarkPostService,
  unbookmarkPostService,
  addCommentService,
} from '../../redux/user/userThunk';
import { Modal } from '../modal/Modal';
import CreatePost from '../create-post/CreatePost';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Post = ({
  comment,
  content,
  likes: { dislikedBy, likeCount, likedBy },
  username,
  isUserPost = false,
  _id,
  createdAt,
  isFollowing = false,
  url = '',
  singlePost = false,
}) => {
  //

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const { allUsers, bookmarks } = useSelector((state) => state.user);

  const isLikedByUser = likedBy.some(
    (likedByUser) => user.user.username === likedByUser.username
  );

  const isBookmarked = bookmarks?.includes(String(_id));

  const postUser = allUsers.find((user) => user.username === username);

  const [initials, setinitials] = useState(
    getInitials(postUser.firstName, postUser.lastName)
  );

  const commentRef = useRef(null);

  const [commentInput, setCommentInput] = useState('');

  const commentData = { comment: commentInput, postId: _id };

  const { callAsyncFunction: unfollowUser, loading: unfollowLoading } =
    useAsync(unfollowUserService, dispatch, postUser._id);

  const { callAsyncFunction: followUser, followLoading } = useAsync(
    followUserService,
    dispatch,
    postUser._id
  );

  const { callAsyncFunction: deletePost, loading: deletePostLoading } =
    useAsync(deletePostService, dispatch, _id);

  const { callAsyncFunction: likePost, loading: likePostLoading } = useAsync(
    likePostService,
    dispatch,
    _id
  );

  const { callAsyncFunction: unlikePost, loading: unlikePostLoading } =
    useAsync(unlikePostService, dispatch, _id);

  const { callAsyncFunction: bookmarkPost, loading: bookmarkPostLoading } =
    useAsync(bookmarkPostService, dispatch, _id);

  const { callAsyncFunction: unbookmarkPost, loading: unbookmarkPostLoading } =
    useAsync(unbookmarkPostService, dispatch, _id);

  const { callAsyncFunction: addComment, addCommentLoading } = useAsync(
    addCommentService,
    dispatch,
    commentData
  );

  // Comments
  const commentChangeHandler = (e) => {
    setCommentInput(e.target.value);
  };

  const addCommentHandler = () => {
    if (commentInput !== '') {
      addComment();
      setCommentInput('');
    }
  };

  // Like/Unlike Post
  const likeClickHandler = () => {
    if (!isLikedByUser) {
      likePost();
    } else {
      unlikePost();
    }
  };

  // follow/ unfollow Posr
  const followClickHandler = () => {
    if (!isFollowing) {
      followUser();
    } else {
      unfollowUser();
    }
  };

  // bookmark post
  const bookmarkClickHandler = () => {
    if (!isBookmarked) {
      bookmarkPost();
    } else {
      unbookmarkPost();
    }
  };

  // Editing post
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => setShowModal((prevState) => !prevState);

  const copyPostLink = () => {
    navigator.clipboard.writeText(`${window.location.hostname}/post/${_id}`);
    console.log(`${window.location.hostname}/post/${_id}`);
    toast.success('Link copied to clipboard');
  };

  return (
    <article className={classes.post}>
      <div className={classes.header}>
        <div className={classes.dp}>
          {postUser.displayPicture ? (
            <img
              className={classes['display-picture']}
              src={postUser.displayPicture}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <Link to={`/p/${postUser._id}`} className={classes.title}>
          {username}
        </Link>
        <div className={classes['options-container']}>
          <svg
            className={`w-6 h-6 ${classes.options}`}
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          <div className={classes['post-options']}>
            {isUserPost ? (
              <>
                <button onClick={toggleShowModal} className={classes.option}>
                  Edit
                </button>
                <button
                  onClick={deletePost}
                  className={classes.option}
                  disabled={deletePostLoading}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={followClickHandler}
                className={classes.option}
                disabled={unfollowLoading || followLoading}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
      {url !== '' && (
        <div
          onClick={() => {
            navigate(`/post/${_id}`);
          }}
          className={classes.img}
        >
          <img src={url} alt="" />
        </div>
      )}
      <div
        onClick={() => {
          navigate(`/post/${_id}`);
        }}
        className={classes.content}
      >
        <p>{content}</p>
      </div>
      <div className={classes['action-container']}>
        <div className={classes.actions}>
          <button
            onClick={likeClickHandler}
            disabled={likePostLoading || unlikePostLoading}
          >
            <svg
              className="w-6 h-6"
              fill={isLikedByUser ? 'red' : 'transparent'}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                stroke="white"
                strokeWidth={isLikedByUser ? '0' : '1'}
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              commentRef.current.focus();
            }}
          >
            <svg
              className="w-6 h-6"
              fill="transparent"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                stroke="white"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={bookmarkClickHandler}
            disabled={bookmarkPostLoading || unbookmarkPostLoading}
          >
            <svg
              className="w-6 h-6"
              fill={isBookmarked ? 'white' : 'transparent'}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="white"
                strokeWidth={isBookmarked ? '0' : '1'}
                d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
              />
            </svg>
          </button>
          <button onClick={copyPostLink}>
            <svg
              className="w-6 h-6"
              fill="transparent"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="white"
                strokeWidth="0.7"
                d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
              />
            </svg>
          </button>
        </div>
        <p>{createdAt}</p>
      </div>
      <div className={classes.likes}>
        {likedBy.length > 0 ? (
          <p>
            Liked by{' '}
            <Link to={`/p/${likedBy[0]._id} `} className={classes.user}>
              {likedBy[0].username}
            </Link>{' '}
            and <span> {likedBy.length > 1 ? likedBy.length - 1 : ' '} </span>
            others
          </p>
        ) : null}
      </div>
      <div className={classes.comments}>
        {comment.comments.length > 0 ? (
          <>
            {comment.comments
              // If it is on single post page show all comments, or else show firt 2
              .slice(0, singlePost ? comment.comments.length : 2)
              .map((comment) => (
                <p className={classes['user-comment']}>
                  <span className={classes.user}>{comment.username}</span>{' '}
                  {comment.comment}
                </p>
              ))}
            {!singlePost ? (
              comment.comments.length > 2 ? (
                <Link className={classes['all-comments']} to={`post/${_id}`}>
                  View all {comment.comments.length} comments
                </Link>
              ) : null
            ) : (
              ''
            )}
          </>
        ) : null}
      </div>
      <div className={classes.comment}>
        <input
          onChange={commentChangeHandler}
          ref={commentRef}
          placeholder="Add a comment."
          type="text"
          value={commentInput}
        />
        <button
          onClick={addCommentHandler}
          className={classes['post-btn']}
          disabled={addCommentLoading}
        >
          Post
        </button>
      </div>

      {showModal && (
        <Modal onClick={toggleShowModal}>
          <CreatePost
            isEditing={true}
            content={content}
            url={url}
            postId={_id}
            closeModal={toggleShowModal}
          />
        </Modal>
      )}
    </article>
  );
};

export default Post;
