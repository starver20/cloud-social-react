import React, { useEffect, useRef, useState } from 'react';
import classes from './CreatePost.module.css';
import { createPostService, editPostService } from '../../redux/user/userThunk';
import { useAsync } from '../../hooks/useAsync';
import { useUser } from '../../context/user/user-context';
import getInitials from '../../utils/getInitials';
import Chip from '../chip/Chip';
import { useSelector, useDispatch } from 'react-redux';

const CreatePost = ({
  closeModal,
  isEditing = false,
  content = '',
  postId,
  url = '',
}) => {
  const [postContent, setPostContent] = useState(content);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(url);
  const [deleteImageToken, setDeleteImageToken] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false); //So user can click 'Publish' while image is still being uploaded to cloudinary

  const user = useSelector((state) => state.auth.user);
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const authUser = allUsers.find(
    (curUser) => curUser.username === user.user.username
  );

  const [initials, setinitials] = useState(
    authUser ? getInitials(authUser.firstName, authUser.lastName) : ''
  );

  const imageInputRef = useRef();

  let data = { postId, content: postContent, url: imageUrl };

  const { callAsyncFunction: createPost, createPostLoading } = useAsync(
    createPostService,
    dispatch,
    data
  );
  const { callAsyncFunction: editPost, editPostLoading } = useAsync(
    editPostService,
    dispatch,
    data
  );

  const deleteImage = async () => {
    let res = await fetch(
      `https://api.cloudinary.com/v1_1/dq81bdilo/delete_by_token/?token=${deleteImageToken}`,
      {
        method: 'POST',
      }
    );
    setDeleteImageToken('');
    setImage('');
  };

  const imageChangeHandler = async (e) => {
    // If user selects any other image, delete previous selected image from cloudinary

    setUploadingImage(true);
    if (deleteImageToken !== '' && !isEditing) {
      await deleteImage();
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
    setDeleteImageToken(data.delete_token);
    setImageUrl(data.url);
    setUploadingImage(false);
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
    setImage('');
    setImageUrl('');
    setDeleteImageToken('');
    setPostContent('');
  };

  return (
    <div className={classes['new-post']}>
      <div className={classes.container}>
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
        <div className={classes['chip-container']}>
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
          {image !== '' && <Chip title={image.name} deleteChip={deleteImage} />}
        </div>

        <button
          onClick={actionClickHandler}
          className={classes.post}
          disabled={postContent === '' || uploadingImage}
        >
          {isEditing ? 'Save' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
