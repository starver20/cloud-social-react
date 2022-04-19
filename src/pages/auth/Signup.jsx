import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import classes from './Auth.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth-context';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submitClickHandler = async (e) => {
    e.preventDefault();

    try {
      let { user, status } = await signup({
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstname.value,
        lastName: e.target.lastname.value,
      });

      status === 201 && navigate('/');
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <Navbar page="auth" />
      <section className={classes['main-content']}>
        <form onSubmit={submitClickHandler} className={classes['card']}>
          {/* <h1>CloudStore</h1> */}
          <h1>Signup</h1>
          <input
            className={classes['creds']}
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
          />
          <input
            className={classes['creds']}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
          />
          <input
            className={classes['creds']}
            type="text"
            name="email"
            id="email"
            placeholder="Email address"
          />
          <input
            className={classes['creds']}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />

          <div className={classes['options']}>
            <div className={classes['remember-chk']}>
              <input id="updates" type="checkbox" />
              <label htmlFor="updates">
                Sign up for emails to get updates from CloudStore on products,
                offers and your Member benefits
              </label>
            </div>
            <span>
              By creating an account you agree to our
              <Link to="/">
                <span className={classes.link}>Privacy Policy</span>
              </Link>{' '}
              and{' '}
              <Link to="/">
                <span className={classes.link}>Terms of Use</span>
              </Link>
            </span>
          </div>
          <button type="submit" className={classes['auth-btn']}>
            SIGNUP
          </button>
          <span>Already a member?</span>
          <Link to="/login">
            <span className={classes.link}>Login</span>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Signup;
