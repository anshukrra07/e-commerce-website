import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import LoginModal from '../components/LoginModal/LoginModal';
import '../styles/Pages/CartWishlistPage.css';
import { cartItems as initialCartItems } from '../data/cartItems';
import { wishlistItems as initialWishlistItems } from '../data/wishlistItems';

function CartWishlistPage({ isLoggedIn, userName, userRole, onLoginSuccess, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cart');
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Cart Functions
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (window.confirm(`Remove "${item.name}" from cart?`)) {
      setCartItems(cartItems.filter(item => item.id !== id));
      alert('Item removed from cart');
    }
  };

  const moveToWishlist = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      setWishlistItems([...wishlistItems, { ...item, rating: 4.5 }]);
      setCartItems(cartItems.filter(item => item.id !== id));
      alert(`"${item.name}" moved to wishlist`);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => 
      total + ((item.original - item.price) * item.quantity), 0
    );
  };

  // Wishlist Functions
  const removeFromWishlist = (id) => {
    const item = wishlistItems.find(item => item.id === id);
    if (window.confirm(`Remove "${item.name}" from wishlist?`)) {
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
      alert('Item removed from wishlist');
    }
  };

  const moveToCart = (id) => {
    const item = wishlistItems.find(item => item.id === id);
    if (item) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
      alert(`"${item.name}" added to cart`);
    }
  };

  return (
    <div className="cart-wishlist-page">
      <Header 
        cartCount={cartItems.length} 
        onLoginClick={() => setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        onLogout={onLogout}
      />
      <CategoryNav />
      
      <div className="page-header">
        <div className="page-header-content">
          <h1>My Cart & Wishlist</h1>
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="page-container">
        <div className="page-tabs">
          <button
            className={`page-tab ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <span className="tab-icon">🛒</span>
            <span className="tab-text">Shopping Cart</span>
            <span className="tab-count">{cartItems.length}</span>
          </button>
          <button
            className={`page-tab ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <span className="tab-icon">❤️</span>
            <span className="tab-text">Wishlist</span>
            <span className="tab-count">{wishlistItems.length}</span>
          </button>
        </div>

        {activeTab === 'cart' ? (
          <div className="cart-section">
            {cartItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add items to your cart to see them here</p>
                <button className="continue-shopping-btn" onClick={() => navigate('/')}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                <div className="cart-items">
                  <h2>Cart Items ({cartItems.length})</h2>
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-emoji">{item.emoji}</div>
                      
                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p className="cart-item-category">{item.category}</p>
                        {!item.inStock && (
                          <span className="out-of-stock-badge">Out of Stock</span>
                        )}
                      </div>

                      <div className="cart-item-price">
                        <span className="current-price">₹{item.price}</span>
                        <span className="original-price">₹{item.original}</span>
                      </div>

                      <div className="cart-item-quantity">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-total">
                        ₹{item.price * item.quantity}
                      </div>

                      <div className="cart-item-actions">
                        <button 
                          className="action-btn wishlist-btn"
                          onClick={() => moveToWishlist(item.id)}
                          title="Move to Wishlist"
                        >
                          ❤️
                        </button>
                        <button 
                          className="action-btn remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h3>Order Summary</h3>
                  
                  <div className="summary-row">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{calculateTotal()}</span>
                  </div>

                  <div className="summary-row savings">
                    <span>Total Savings</span>
                    <span className="savings-amount">- ₹{calculateSavings()}</span>
                  </div>

                  <div className="summary-row">
                    <span>Delivery Charges</span>
                    <span className="free">FREE</span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal()}</span>
                  </div>

                  <button className="checkout-btn">
                    Proceed to Checkout
                  </button>

                  <div className="summary-note">
                    🔒 Safe and secure payments
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="wishlist-section">
            <h2>My Wishlist ({wishlistItems.length})</h2>
            
            {wishlistItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">❤️</div>
                <h3>Your wishlist is empty</h3>
                <p>Save items you love to your wishlist</p>
                <button className="continue-shopping-btn" onClick={() => navigate('/')}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlistItems.map(item => (
                  <div key={item.id} className="wishlist-item">
                    <div className="wishlist-item-header">
                      <div className="wishlist-item-emoji">{item.emoji}</div>
                      {!item.inStock && (
                        <span className="stock-badge out">Out of Stock</span>
                      )}
                      {item.inStock && (
                        <span className="stock-badge in">In Stock</span>
                      )}
                    </div>

                    <h3 className="wishlist-item-name">{item.name}</h3>
                    <p className="wishlist-item-category">{item.category}</p>

                    <div className="wishlist-item-rating">
                      ⭐ {item.rating}
                    </div>

                    <div className="wishlist-item-pricing">
                      <span className="wishlist-price">₹{item.price}</span>
                      <span className="wishlist-original">₹{item.original}</span>
                    </div>

                    <div className="wishlist-discount">
                      {Math.round(((item.original - item.price) / item.original) * 100)}% OFF
                    </div>

                    <div className="wishlist-item-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => moveToCart(item.id)}
                        disabled={!item.inStock}
                      >
                        {item.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                      </button>
                      <button 
                        className="remove-wishlist-btn"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
}

export default CartWishlistPage;
