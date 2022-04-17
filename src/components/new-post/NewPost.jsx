import React from 'react';
import classes from './NewPost.module.css';

const NewPost = () => {
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
          rows={3}
          placeholder="What's on your mind today?"
        />
      </div>
      <div className={classes.actions}>
        <div className={classes.media}></div>
        <button className={classes.post}>Publish</button>
      </div>
    </div>
  );
};

export default NewPost;
