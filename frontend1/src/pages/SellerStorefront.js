import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import LoginModal from '../components/LoginModal/LoginModal';
import '../styles/Pages/SellerStorefront.css';

// Mock seller data
const sellersData = {
  'techvista-electronics': {
    id: 'techvista-electronics',
    name: 'TechVista Electronics',
    logo: '🖥️',
    banner: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Your trusted source for cutting-edge electronics and gadgets. We bring you the latest technology at competitive prices.',
    rating: 4.8,
    totalReviews: 2847,
    totalProducts: 156,
    totalSales: 15234,
    joinedDate: 'Jan 2022',
    location: 'Mumbai, India',
    contactEmail: 'support@techvista.com',
    policies: {
      returns: '30-day return policy on all products',
      shipping: 'Free shipping on orders above ₹999',
      warranty: '1-year manufacturer warranty on all electronics'
    },
    categories: ['Electronics', 'Accessories', 'Gaming'],
    products: [
      { id: 1, name: 'Wireless Headphones Pro', emoji: '🎧', price: 3999, original: 5999, rating: 4.7, category: 'Electronics', inStock: true, seller: 'TechVista Electronics' },
      { id: 2, name: 'Smart Watch Series 5', emoji: '⌚', price: 8999, original: 12999, rating: 4.8, category: 'Electronics', inStock: true, seller: 'TechVista Electronics' },
      { id: 3, name: 'Bluetooth Speaker', emoji: '🔊', price: 2499, original: 3999, rating: 4.6, category: 'Electronics', inStock: true, seller: 'TechVista Electronics' },
      { id: 4, name: 'Gaming Mouse RGB', emoji: '🖱️', price: 1999, original: 2999, rating: 4.5, category: 'Gaming', inStock: true, seller: 'TechVista Electronics' },
      { id: 5, name: 'Mechanical Keyboard', emoji: '⌨️', price: 4999, original: 6999, rating: 4.9, category: 'Gaming', inStock: false, seller: 'TechVista Electronics' },
      { id: 6, name: 'Webcam HD Pro', emoji: '📹', price: 3499, original: 4999, rating: 4.4, category: 'Electronics', inStock: true, seller: 'TechVista Electronics' },
      { id: 7, name: 'USB-C Hub 7-in-1', emoji: '🔌', price: 1799, original: 2499, rating: 4.6, category: 'Accessories', inStock: true, seller: 'TechVista Electronics' },
      { id: 8, name: 'Wireless Charger', emoji: '🔋', price: 1499, original: 2199, rating: 4.5, category: 'Accessories', inStock: true, seller: 'TechVista Electronics' }
    ]
  },
  'fashion-fusion': {
    id: 'fashion-fusion',
    name: 'Fashion Fusion',
    logo: '👗',
    banner: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    description: 'Trendy fashion for every style. From casual wear to formal attire, we have it all.',
    rating: 4.6,
    totalReviews: 1892,
    totalProducts: 234,
    totalSales: 8945,
    joinedDate: 'Mar 2022',
    location: 'Delhi, India',
    contactEmail: 'hello@fashionfusion.com',
    policies: {
      returns: '15-day return policy with tags attached',
      shipping: 'Free shipping on orders above ₹1499',
      warranty: 'Quality guarantee on all products'
    },
    categories: ['Clothing', 'Accessories', 'Footwear'],
    products: [
      { id: 9, name: 'Cotton T-Shirt', emoji: '👕', price: 499, original: 899, rating: 4.5, category: 'Clothing', inStock: true, seller: 'Fashion Fusion' },
      { id: 10, name: 'Denim Jeans', emoji: '👖', price: 1299, original: 1999, rating: 4.7, category: 'Clothing', inStock: true, seller: 'Fashion Fusion' },
      { id: 11, name: 'Summer Dress', emoji: '👗', price: 1799, original: 2999, rating: 4.6, category: 'Clothing', inStock: true, seller: 'Fashion Fusion' },
      { id: 12, name: 'Leather Jacket', emoji: '🧥', price: 3999, original: 5999, rating: 4.8, category: 'Clothing', inStock: false, seller: 'Fashion Fusion' },
      { id: 13, name: 'Casual Sneakers', emoji: '👟', price: 2499, original: 3499, rating: 4.5, category: 'Footwear', inStock: true, seller: 'Fashion Fusion' },
      { id: 14, name: 'Crossbody Bag', emoji: '👜', price: 1599, original: 2299, rating: 4.4, category: 'Accessories', inStock: true, seller: 'Fashion Fusion' }
    ]
  },
  'stepstyle': {
    id: 'stepstyle',
    name: 'StepStyle',
    logo: '👟',
    banner: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    description: 'Premium footwear collection for every occasion. Walk in style, walk in comfort.',
    rating: 4.7,
    totalReviews: 1543,
    totalProducts: 89,
    totalSales: 6234,
    joinedDate: 'May 2022',
    location: 'Bangalore, India',
    contactEmail: 'care@stepstyle.com',
    policies: {
      returns: '20-day return policy for unworn shoes',
      shipping: 'Free shipping on all orders',
      warranty: '6-month sole warranty'
    },
    categories: ['Footwear', 'Sports'],
    products: [
      { id: 15, name: 'Running Shoes Pro', emoji: '👟', price: 3499, original: 4999, rating: 4.8, category: 'Sports', inStock: true, seller: 'StepStyle' },
      { id: 16, name: 'Formal Leather Shoes', emoji: '👞', price: 2999, original: 4499, rating: 4.6, category: 'Footwear', inStock: true, seller: 'StepStyle' },
      { id: 17, name: 'Canvas Sneakers', emoji: '👟', price: 1899, original: 2499, rating: 4.5, category: 'Footwear', inStock: true, seller: 'StepStyle' },
      { id: 18, name: 'Sports Sandals', emoji: '🩴', price: 1299, original: 1899, rating: 4.4, category: 'Sports', inStock: true, seller: 'StepStyle' }
    ]
  }
};

const SellerStorefront = ({ isLoggedIn, userName, userRole, onLoginSuccess, onLogout }) => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const seller = sellersData[sellerId] || sellersData['techvista-electronics'];

  // Filter products by category
  let filteredProducts = selectedCategory === 'all' 
    ? seller.products 
    : seller.products.filter(p => p.category === selectedCategory);

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  const handleAddToCart = (product) => {
    setCartCount(cartCount + 1);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="seller-storefront-page">
      <Header 
        cartCount={cartCount} 
        onLoginClick={() => setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        onLogout={onLogout}
      />
      <CategoryNav />

      {/* Seller Banner */}
      <div className="seller-banner" style={{ background: seller.banner }}>
        <div className="container">
          <button className="back-btn-white" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <div className="seller-banner-content">
            <div className="seller-logo-large">{seller.logo}</div>
            <div className="seller-banner-info">
              <h1>{seller.name}</h1>
              <div className="seller-meta">
                <span className="seller-rating">⭐ {seller.rating} ({seller.totalReviews} reviews)</span>
                <span className="seller-stat">📦 {seller.totalProducts} Products</span>
                <span className="seller-stat">🛒 {seller.totalSales.toLocaleString()} Sales</span>
                <span className="seller-stat">📍 {seller.location}</span>
              </div>
              <p className="seller-description">{seller.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="storefront-layout">
          {/* Sidebar */}
          <aside className="storefront-sidebar">
            {/* About Seller */}
            <div className="sidebar-section">
              <h3>About Seller</h3>
              <div className="seller-info-box">
                <div className="info-row">
                  <span className="info-label">📅 Joined:</span>
                  <span className="info-value">{seller.joinedDate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">📧 Email:</span>
                  <span className="info-value">{seller.contactEmail}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="sidebar-section">
              <h3>Categories</h3>
              <div className="category-filters">
                <button 
                  className={`category-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products ({seller.products.length})
                </button>
                {seller.categories.map(cat => {
                  const count = seller.products.filter(p => p.category === cat).length;
                  return (
                    <button 
                      key={cat}
                      className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Policies */}
            <div className="sidebar-section">
              <h3>Store Policies</h3>
              <div className="policies-box">
                <div className="policy-item">
                  <span className="policy-icon">↩️</span>
                  <p>{seller.policies.returns}</p>
                </div>
                <div className="policy-item">
                  <span className="policy-icon">🚚</span>
                  <p>{seller.policies.shipping}</p>
                </div>
                <div className="policy-item">
                  <span className="policy-icon">✅</span>
                  <p>{seller.policies.warranty}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <div className="storefront-main">
            <div className="storefront-header">
              <div className="storefront-title">
                <h2>Products ({filteredProducts.length})</h2>
                {selectedCategory !== 'all' && (
                  <span className="category-badge">{selectedCategory}</span>
                )}
              </div>
              <div className="storefront-sort">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products-state">
                <p>No products found in this category</p>
                <button className="btn-reset" onClick={() => setSelectedCategory('all')}>
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="storefront-products-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    category={product.category}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
};

export default SellerStorefront;
