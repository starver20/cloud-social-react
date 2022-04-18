import React from 'react';
import classes from './SuggestedProfile.module.css';

const SuggestedProfile = () => {
  return (
    <>
      <div className={classes.suggestion}>
        <div className={classes['suggested-profile']}>
          <img
            className={`avatar avatar-sm`}
            src="https://pbs.twimg.com/profile_images/1220285531164233729/A98RISKc_200x200.jpg"
            alt="small avatar"
          />
          <span className={classes.username}>amar_narute</span>
        </div>
        <span className={classes.action}>Follow</span>
      </div>
    </>
  );
};

export default SuggestedProfile;
