import React, { useEffect, useState } from 'react';
import { Modal } from '../../modal/Modal';
import classes from './StoryModal.module.css';
import getInitials from '../../../utils/getInitials';
import { Link } from 'react-router-dom';

const StoryModal = ({ toggleShowStory, user }) => {
  const [curImage, setCurImage] = useState(0);
  const [initials, setinitials] = useState(
    getInitials(user.firstName, user.lastName)
  );

  const images = user.stories[0].images;

  const onDotClicked = (e) => {
    e.stopPropagation();
    setCurImage(Number(e.target.id));
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (curImage == images.length - 1) {
        toggleShowStory();
        clearInterval(timer);
      } else {
        setCurImage((prev) => prev + 1);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [curImage]);

  return (
    <Modal onClick={toggleShowStory}>
      <div className={classes['story-image-container']}>
        <img className={classes['story-image']} src={images[curImage]} alt="" />
        <div className={classes['user-info']}>
          <div className={classes.dp}>
            {user.displayPicture ? (
              <img
                className={classes['display-picture']}
                src={user.displayPicture}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <Link to={`/p/${user._id}`} className={classes.title}>
            {user.username}
          </Link>
        </div>
        <div className={classes.counts}>
          {[...Array(images.length)].map((itr, index) => {
            return (
              <span
                onClick={onDotClicked}
                id={index}
                className={`${classes.dot} ${
                  curImage == index ? classes.active : ''
                }`}
              ></span>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default StoryModal;
