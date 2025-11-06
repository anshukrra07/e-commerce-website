import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ cartCount, onLoginClick, compareCount = 3, isLoggedIn = false, userName = 'User', userRole = 'customer', onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Debug: Log received props
  console.log('Header received props - isLoggedIn:', isLoggedIn, 'userName:', userName, 'userRole:', userRole);

  const handleLogout = () => {
    setShowDropdown(false);
    if (onLogout) {
      onLogout();
    }
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo">
            🛒 S-E-Com
          </a>

          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products, brands and more..."
            />
            <button className="search-btn">Search</button>
          </div>

          <div className="nav-actions">
            {userRole === 'admin' && (
              <a href="/admin" className="admin-link" title="Admin Dashboard">
                🛡️
              </a>
            )}
            {userRole === 'seller' && (
              <a href="/seller" className="seller-link" title="Seller Dashboard">
                🏪
              </a>
            )}
            <button className="compare-btn" onClick={() => navigate('/compare')} title="Compare Products">
              ⚖️
              {compareCount > 0 && <span className="compare-count">{compareCount}</span>}
            </button>
            <button className="cart-btn" onClick={() => navigate('/cart')}>
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            {isLoggedIn ? (
              <div className="user-profile">
                <button className="user-btn" onClick={() => setShowDropdown(!showDropdown)}>
                  <span className="user-icon">
                    {userRole === 'admin' ? '🛡️' : userRole === 'seller' ? '🏪' : '👤'}
                  </span>
                  <span className="user-name">{userName}</span>
                  <span className="user-role">({userRole})</span>
                </button>
                {showDropdown && (
                  <div className="user-dropdown">
                    <div className="dropdown-item user-info">
                      <strong>{userName}</strong>
                      <span className="role-badge">{userRole}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    {userRole === 'seller' && (
                      <button className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/seller'); }}>
                        🏪 My Dashboard
                      </button>
                    )}
                    {userRole === 'admin' && (
                      <button className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/admin'); }}>
                        🛡️ Admin Dashboard
                      </button>
                    )}
                    <button className="dropdown-item" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-btn primary" onClick={onLoginClick}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
