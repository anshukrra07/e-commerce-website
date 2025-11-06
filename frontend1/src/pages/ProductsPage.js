import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import LoginModal from '../components/LoginModal/LoginModal';
import '../styles/Pages/ProductsPage.css';

// Import all products
import { electronics, clothes, shoes, accessories, homeDecor } from '../data/products';

const ProductsPage = ({ isLoggedIn, userName, userRole, onLoginSuccess, onLogout }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Map category to products and metadata
  const categoryData = {
    electronics: {
      title: '📱 Electronics',
      products: electronics,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Latest gadgets and electronic devices'
    },
    clothing: {
      title: '👕 Fashion & Clothing',
      products: clothes,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Trendy fashion for every style'
    },
    footwear: {
      title: '👟 Footwear',
      products: shoes,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Comfortable and stylish footwear'
    },
    accessories: {
      title: '👜 Accessories',
      products: accessories,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Complete your look with accessories'
    },
    'home-decor': {
      title: '🏠 Home & Decor',
      products: homeDecor,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Beautiful items for your home'
    }
  };

  const currentCategory = categoryData[category] || categoryData.electronics;

  // Get all products from all categories for cross-category filtering
  const allProducts = [...electronics, ...clothes, ...shoes, ...accessories, ...homeDecor];
  
  // Extract unique brands from all products
  const allBrands = [...new Set(allProducts.map(p => p.seller).filter(Boolean))];

  // Sorting and filtering
  let filteredProducts = [...currentCategory.products];

  // Filter by price range
  if (priceRange !== 'all') {
    const ranges = {
      'under-1000': [0, 1000],
      '1000-5000': [1000, 5000],
      '5000-25000': [5000, 25000],
      'above-25000': [25000, Infinity]
    };
    const [min, max] = ranges[priceRange];
    filteredProducts = filteredProducts.filter(p => p.price >= min && p.price < max);
  }

  // Filter by brands
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.seller));
  }

  // Filter by ratings
  if (selectedRatings.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const rating = Math.floor(p.rating);
      return selectedRatings.includes(rating);
    });
  }

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const handleAddToCart = (product) => {
    setCartCount(cartCount + 1);
    alert(`Added ${product.name} to cart!`);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setPriceRange('all');
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSortBy('default');
  };

  return (
    <div className="app">
      <Header 
        cartCount={cartCount} 
        onLoginClick={() => setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        onLogout={onLogout}
      />
      <CategoryNav />

      <div className="products-page">
        {/* Category Header */}
        <div className="category-banner" style={{ background: currentCategory.gradient }}>
          <div className="container">
            <button className="back-btn" onClick={() => navigate('/')}>
              ← Back to Home
            </button>
            <h1 className="category-title">{currentCategory.title}</h1>
            <p className="category-description">{currentCategory.description}</p>
            <div className="category-stats">
              <span>{filteredProducts.length} Products</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="products-content">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filter-header">
                <h2>Filters</h2>
                {(selectedBrands.length > 0 || selectedRatings.length > 0 || priceRange !== 'all') && (
                  <button className="clear-filters-btn" onClick={clearAllFilters}>
                    Clear All
                  </button>
                )}
              </div>

              <div className="filter-section">
                <h3>Sort By</h3>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="filter-options">
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceRange === 'all'}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    All Prices
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="under-1000"
                      checked={priceRange === 'under-1000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    Under ₹1,000
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="1000-5000"
                      checked={priceRange === '1000-5000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    ₹1,000 - ₹5,000
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="5000-25000"
                      checked={priceRange === '5000-25000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    ₹5,000 - ₹25,000
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value="above-25000"
                      checked={priceRange === 'above-25000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    Above ₹25,000
                  </label>
                </div>
              </div>

              <div className="filter-section">
                <h3>Brand</h3>
                <div className="filter-options">
                  {allBrands.map(brand => {
                    const count = currentCategory.products.filter(p => p.seller === brand).length;
                    if (count === 0) return null;
                    return (
                      <label key={brand} className="filter-option checkbox-option">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                        <span className="checkbox-label">
                          {brand} <span className="filter-count">({count})</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="filter-section">
                <h3>Customer Ratings</h3>
                <div className="filter-options">
                  {[5, 4, 3, 2, 1].map(rating => {
                    const count = currentCategory.products.filter(p => Math.floor(p.rating) === rating).length;
                    if (count === 0) return null;
                    return (
                      <label key={rating} className="filter-option checkbox-option rating-option">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => toggleRating(rating)}
                        />
                        <span className="checkbox-label">
                          <span className="rating-stars">{'⭐'.repeat(rating)}</span>
                          <span className="rating-text"> {rating} & Up</span>
                          <span className="filter-count">({count})</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="products-main">
              {filteredProducts.length > 0 ? (
                <div className="products-grid-page">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      category={currentCategory.title}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-products">
                  <p>No products found in this price range.</p>
                  <button onClick={() => setPriceRange('all')} className="btn btn-primary">
                    Show All Products
                  </button>
                </div>
              )}
            </div>
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

export default ProductsPage;
