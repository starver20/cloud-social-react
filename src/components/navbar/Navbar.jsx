import { Link, useNavigate } from 'react-router-dom';
import classes from './Navbar.module.css';
import cloud from '../../assets/cloud.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import { clearData } from '../../redux/user/userSlice';

const Navbar = ({ page = 'home' }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { bookmarks } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let isBookmarked = bookmarks?.length > 0;

  const authClickHandler = (e) => {
    // If user is logged in, then log him out and clear the wishlist and cart
    if (user) {
      dispatch(clearData());
      dispatch(logout());
    }
    navigate('/login');
  };

  return (
    <>
      <header className={`header ${classes.nav}`}>
        <nav className="navbar">
          <Link
            to={'/'}
            className={`nav-logo ${classes.brand}`}
            style={{ color: 'white' }}
          >
            <img className={classes.logo} src={cloud} alt="" />
            <span>CloudSocial</span>
          </Link>
          <div className="nav-action-container">
            <div className="nav-action">
              {user?.jwt ? (
                <>
                  <div className="nav-icon">
                    <Link to={'/'}>
                      <svg
                        className="w-6 h-6"
                        fill={isBookmarked ? 'white' : 'none'}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke="white"
                          strokeWidth={isBookmarked ? '0' : '1'}
                          d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
                        />
                      </svg>
                      {isBookmarked ? (
                        <span className="icon-number">{bookmarks.length}</span>
                      ) : null}
                    </Link>
                  </div>
                  <div className={`nav-icon ${classes['options-container']}`}>
                    <Link to="/">
                      <svg
                        className="w-6 h-6"
                        fill="white"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                    <div className={classes['profile-options']}>
                      <Link to={`/p/${user.user._id}`}>
                        <button
                          className={`nav--action__login ${classes.option}`}
                        >
                          Profile
                        </button>
                      </Link>
                      <button
                        onClick={authClickHandler}
                        className={`nav--action__login ${classes.option}`}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
