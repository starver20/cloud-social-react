import React, { useState } from 'react';
import { useAuth } from '../../context/auth/auth-context';
import classes from './Post.module.css';
import { useUser } from '../../context/user/user-context';
import { useAsync } from '../../hooks/useAsync';
import { unfollowUserService, deletePostService } from '../../utils/user-utils';
import { Modal } from '../modal/Modal';
import CreatePost from '../create-post/CreatePost';

const Post = ({
  content,
  likes: { dislikedBy, likeCount, likedBy },
  username,
  isUserPost = false,
  _id,
}) => {
  const { user } = useAuth();
  const likedByUser = likedBy.includes(user.username);
  const { userDispatch, allUsers } = useUser();

  const postUser = allUsers.find((user) => user.username === username);

  const { callAsyncFunction: unfollowUser, unfollowLoading } = useAsync(
    unfollowUserService,
    userDispatch,
    postUser._id
  );

  const { callAsyncFunction: deletePost, deletePostLoading } = useAsync(
    deletePostService,
    userDispatch,
    _id
  );

  // Editing post
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => setShowModal((prevState) => !prevState);

  return (
    <article className={classes.post}>
      <div className={classes.header}>
        <img
          className={`avatar avatar-md ${classes.profile}`}
          src="https://pbs.twimg.com/profile_images/1220285531164233729/A98RISKc_200x200.jpg"
          alt="medium avatar"
        />
        <span className={classes.title}>{username}</span>
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
                <button onClick={deletePost} className={classes.option}>
                  Delete
                </button>
              </>
            ) : (
              <button onClick={unfollowUser} className={classes.option}>
                Unfollow
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <div className={classes.img}>
        <img
          src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
          alt=""
        />
      </div> */}
      <div className={classes.content}>
        <p>{content}</p>
      </div>
      <div className={classes.actions}>
        <button>
          <svg
            className="w-6 h-6"
            fill={likedByUser ? 'red' : 'transparent'}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              stroke="white"
              strokeWidth={likedByUser ? '0' : '1'}
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button>
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
        <button>
          <svg
            className="w-6 h-6"
            fill="transparent"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="white"
              d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
            />
          </svg>
        </button>
      </div>

      {showModal && (
        <Modal onClick={toggleShowModal}>
          <CreatePost
            isEditing={true}
            content={content}
            postId={_id}
            closeModal={toggleShowModal}
          />
        </Modal>
      )}
    </article>
  );
};

export default Post;
