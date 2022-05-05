import React from 'react';
import classes from './ProfilesCard.module.css';

const ProfilesCard = ({ children }) => {
  return <div className={classes.sidebar}>{children}</div>;
};

export default ProfilesCard;
