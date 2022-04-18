import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import cloud from '../../assets/cloud.png';

const Navbar = ({ page = 'home' }) => {
  let jwt = true;

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
          {/* <div className="nav-search">
            <div className={classes.search}>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
              />
            </div>
            {searchProducts.length > 0 || searchTerm !== '' ? (
              <div className={classes['search-list']}>
                <ul>
                  {searchProducts.map((product) => {
                    return (
                      <li
                        onClick={() => {
                          productClickHandler(product._id);
                        }}
                        className={classes.product}
                      >
                        {product.title}
                      </li>
                    );
                  })}
                </ul>
                {searchProducts.length === 0 ? (
                  <p className={classes['not-found']}>
                    No matching products found.
                  </p>
                ) : null}
              </div>
            ) : null}
          </div> */}
          <div className="nav-action-container">
            <div className="nav-action">
              {jwt ? (
                <>
                  <div className="nav-icon">
                    <svg
                      className="w-6 h-6"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="nav-icon">
                    <Link to={'/'}>
                      <svg
                        className="w-6 h-6"
                        fill="white"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>

                      <span className="icon-number">{6}</span>
                    </Link>
                  </div>
                  {/* <div className="nav-icon">
                    <Link to={'/cart'}>
                      <svg
                        className="w-6 h-6"
                        fill="white"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="0"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>

                      <span className="icon-number">{5}</span>
                    </Link>
                  </div> */}
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
                      <Link to="/profile">
                        <button className="nav--action__login">Profile</button>
                      </Link>
                      <button className="nav--action__login">Logout</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {page !== 'auth' && (
                    <button className="nav--action__login">LOGIN</button>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
