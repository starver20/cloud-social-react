import React, { useRef, useState } from 'react';
import classes from './CreatePost.module.css';
import { createPostService, editPostService } from '../../utils/user-utils';
import { useAsync } from '../../hooks/useAsync';
import { useUser } from '../../context/user/user-context';
import axios from 'axios';
const CreatePost = ({
  closeModal,
  isEditing = false,
  content = '',
  postId,
}) => {
  const [postContent, setPostContent] = useState(content);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deleteImageToken, setDeleteImageToken] = useState('');

  const imageInputRef = useRef();

  const { userDispatch } = useUser();

  let data = { postId, content: postContent, url: imageUrl };

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

  const imageChangeHandler = async (e) => {
    // If user selects any other image, delete previous selected image from cloudinary
    if (deleteImageToken !== '') {
      console.log(deleteImageToken);
      let res = await fetch(
        `https://api.cloudinary.com/v1_1/dq81bdilo/delete_by_token/?token=${deleteImageToken}`,
        {
          method: 'POST',
          // token: image.delete_token,
        }
      );
      let data = await res.json();
      console.log(data);
    }

    let imageToUpload = e.target.files[0];
    setImage(imageToUpload);
    const formData = new FormData();
    formData.append('file', imageToUpload);
    formData.append('upload_preset', 'cloudsocial');
    formData.append('cloud_name', 'dq81bdilo');
    let res = await fetch(
      'https://api.cloudinary.com/v1_1/dq81bdilo/image/upload/',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    setDeleteImageToken(data.delete_token);
    setImageUrl(data.url);
  };

  const addImageHandler = () => {
    imageInputRef.current.click();
  };

  const contentChangeHandler = (e) => setPostContent(e.target.value);

  const actionClickHandler = () => {
    if (!isEditing) {
      createPost();
    } else {
      if (postContent !== content && postContent !== '') {
        editPost();
      }
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
          style={{ height: `${isEditing ? '25rem' : '15rem'}` }}
          type="text"
          rows={10}
          placeholder="What's on your mind today?"
          value={postContent}
          onChange={contentChangeHandler}
        />
      </div>
      <div className={classes.actions}>
        {/* Image upload */}
        <input
          style={{ display: 'none' }}
          onChange={imageChangeHandler}
          ref={imageInputRef}
          type="file"
          name=""
          id=""
        />
        <div onClick={addImageHandler} className={classes.media}>
          <svg
            className="w-6 h-6"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
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
