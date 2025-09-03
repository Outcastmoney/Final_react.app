import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ onSignInClick, onSignUpClick, onLogout, isLoggedIn, currentUser }) {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <header className={`header ${!isMainPage ? 'header_saved-page' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link
                to="/"
                className={`header__nav-link ${
                  isMainPage ? "header__nav-link_active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="header__nav-item">
                <Link
                  to="/saved-news"
                  className={`header__nav-link ${
                    !isMainPage ? "header__nav-link_active" : ""
                  }`}
                >
                  Saved articles
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="header__nav-item">
                <button
                  className="header__auth-button header__auth-button_type_signin"
                  onClick={onSignInClick}
                >
                  Sign in
                </button>
              </li>
            )}
            {!isLoggedIn && !isMainPage && (
              <li className="header__nav-item">
                <button
                  className="header__auth-button header__auth-button_type_signup"
                  onClick={onSignUpClick}
                >
                  Sign up
                </button>
              </li>
            )}
            {isLoggedIn && (
              <li className="header__nav-item">
                <button
                  className="header__auth-button header__auth-button_type_logout"
                  onClick={onLogout}
                >
                  <span className="header__username">
                    {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}
                  </span>
                  <svg 
                    className="header__logout-icon" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
