import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import classes from './Auth.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../redux/auth/authThunk';
import { useDispatch } from 'react-redux';

const Login = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  let navigateTo = location.state?.from?.pathname || '/';

  const loginClickHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        login(
          {
            username: e.target.email.value,
            password: e.target.password.value,
          },
          rememberMe
        )
      );

      navigate(navigateTo, { replace: true });
    } catch (err) {
      alert(err);
    }
  };

  const guestLogin = async () => {
    try {
      await dispatch(
        login({
          user: {
            username: 'adarshbalika',
            password: 'adarshBalika123',
          },
          rememberMe,
        })
      );

      // if (loginStatus === 'succeeded') {
      navigate(navigateTo, { replace: true });
      // } else {
      // alert('Invalid email or password');
      // }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <Navbar page="auth" />
      <section className={classes['main-content']}>
        <form onSubmit={loginClickHandler} className={classes['card']}>
          <h1>Welcome back!</h1>
          {/* <h3>Login</h3> */}
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
              <input
                onChange={() => {
                  setRememberMe((prevState) => !prevState);
                }}
                id="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Link to="/" className={classes['forgot-pass']}>
              <span className={classes.link}>Forgot your password?</span>
            </Link>
          </div>
          <div
            onClick={guestLogin}
            className={`${classes['forgot-pass']} ${classes.guest}`}
          >
            <span className={classes.link}>Guest login</span>
          </div>
          <button type="submit" className={classes['auth-btn']}>
            LOGIN
          </button>

          <span>Not a member?</span>
          <Link to="/signup">
            <span className={classes.link}>Join us</span>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
