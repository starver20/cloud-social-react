import React from 'react';
import classes from './SidebarCard.module.css';

const SidebarCard = ({ children }) => {
  return <div className={classes.sidebar}>{children}</div>;
};

export default SidebarCard;
