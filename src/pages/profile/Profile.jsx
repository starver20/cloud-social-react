import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';
import Navbar from '../../components/navbar/Navbar';
import getInitials from '../../utils/getInitials';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [initials, setinitials] = useState('');
  const [profileUser, setProfileUser] = useState({});

  const { userId } = useParams();
  useEffect(() => {
    (async () => {
      let response = await axios.get(`/api/users/${userId}`);
      let responseUser = response.data.user;
      setinitials(getInitials(responseUser.firstName, responseUser.lastName));
      setProfileUser(responseUser);
    })();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div className={classes['main-content']}>
        <div className={classes.banner}>
          <div className={classes.hero}>
            <h1>Hello {profileUser.firstName}, what's on your mind today?</h1>
            <div className={classes.img}>
              <span>{initials}</span>
            </div>
          </div>
        </div>
        <section className={classes.section}>
          <div className={classes['container']}>
            <div>
              <span className={classes['title']}>
                {profileUser.firstName + ' ' + profileUser.lastName}
              </span>
            </div>
            <div className={classes.tabs}>
              <span className={classes.tab}>123 Followers</span>
              <span className={classes.tab}>123 Following</span>
              <span className={classes.tab}>Posts</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
