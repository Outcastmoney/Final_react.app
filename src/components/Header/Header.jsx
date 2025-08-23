import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()
  const isMainPage = location.pathname === '/'

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link 
                to="/" 
                className={`header__nav-link ${isMainPage ? 'header__nav-link_active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="header__nav-item">
              <Link 
                to="/saved-news" 
                className={`header__nav-link ${!isMainPage ? 'header__nav-link_active' : ''}`}
              >
                Saved articles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
