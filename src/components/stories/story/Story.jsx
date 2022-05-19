import React, { useEffect, useState } from 'react';
import classes from './Story.module.css';
import StoryModal from '../story-modal/StoryModal';
import getInitials from '../../../utils/getInitials';

const Story = ({ user = {} }) => {
  const [showStory, setShowStory] = useState(false);

  const [initials, setinitials] = useState(
    getInitials(user.firstName, user.lastName)
  );
  console.log(user, initials);

  useEffect(() => {
    setinitials(getInitials(user.firstName, user.lastName));
  }, [user]);

  const toggleShowStory = (e) => {
    e && e.stopPropagation(); //Stop propagetion when its attached to event, not when it is invoked in any other function like in StoryModal :23
    // Or else it will get clicked once on backdrop and again on story-container
    setShowStory((prevState) => !prevState);
  };

  return (
    <div onClick={toggleShowStory} className={classes['story-container']}>
      {/* Event delegation in action, wether we click image or the span, click will be handled in the parent div */}
      <div className={classes.dp}>
        {user.displayPicture ? (
          <img
            class="avatar avatar-lg"
            src={user.displayPicture}
            alt="medium logo"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <span className={classes.username}>{user.username}</span>
      {showStory && (
        <StoryModal toggleShowStory={toggleShowStory} user={user} />
      )}
    </div>
  );
};

export default Story;
