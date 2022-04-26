import React, { useState } from 'react';
import classes from './CreatePost.module.css';
import { createPostService, editPostService } from '../../utils/user-utils';
import { useAsync } from '../../hooks/useAsync';
import { useUser } from '../../context/user/user-context';

const CreatePost = ({
  closeModal,
  isEditing = false,
  content = '',
  postId,
}) => {
  const { userDispatch } = useUser();

  const [postContent, setPostContent] = useState(content);

  let data = { postId, content: postContent };

  const { callAsyncFunction: createPost, createPostLoading } = useAsync(
    createPostService,
    userDispatch,
    data
  );
  const { callAsyncFunction: editPost, editPostLoading } = useAsync(
    editPostService,
    userDispatch,
    data
  );

  const contentChangeHandler = (e) => setPostContent(e.target.value);

  const actionClickHandler = () => {
    if (!isEditing) {
      createPost();
    } else {
      editPost();
      closeModal();
    }
    setPostContent('');
  };

  return (
    <div className={classes['new-post']}>
      <div className={classes.container}>
        <img
          className={`avatar avatar-md ${classes.profile}`}
          src="https://pbs.twimg.com/profile_images/1220285531164233729/A98RISKc_200x200.jpg"
          alt="medium avatar"
        />
        <textarea
          className={classes.content}
          type="text"
          rows={10}
          placeholder="What's on your mind today?"
          value={postContent}
          onChange={contentChangeHandler}
        />
      </div>
      <div className={classes.actions}>
        <div className={classes.media}></div>
        <button
          onClick={actionClickHandler}
          className={classes.post}
          disabled={postContent === ''}
        >
          {isEditing ? 'Save' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
