import React, { useState } from 'react';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Footer from '../components/Footer/Footer';
import Carousel from '../components/Carousel/Carousel';
import ProductSection from '../components/ProductSection/ProductSection';
import LoginModal from '../components/LoginModal/LoginModal';

// Import data
import { slides } from '../data/slides';
import { electronics, clothes, shoes, accessories, homeDecor } from '../data/products';
import { trendingProducts } from '../data/trendingProducts';

const HomePage = ({ isLoggedIn, userName, userRole, onLoginSuccess, onLogout }) => {
  const [cartCount, setCartCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = (product) => {
    setCartCount(cartCount + 1);
    alert(`Added ${product.name} to cart!`);
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

      <Carousel slides={slides} />

      <div className="container">
        {/* Trending Section */}
        <div id="trending" style={{ marginBottom: '2rem' }}>
          <ProductSection
            title="🔥 Trending Now"
            products={trendingProducts}
            category="Trending"
            categoryId="trending"
            onAddToCart={handleAddToCart}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </div>

        <div id="electronics">
          <ProductSection
            title="📱 Electronics"
            products={electronics}
            category="Electronics"
            categoryId="electronics"
            onAddToCart={handleAddToCart}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </div>

        <div id="clothing">
          <ProductSection
            title="👕 Fashion & Clothing"
            products={clothes}
            category="Clothing"
            categoryId="clothing"
            onAddToCart={handleAddToCart}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </div>

        <div id="footwear">
          <ProductSection
            title="👟 Footwear"
            products={shoes}
            category="Footwear"
            categoryId="footwear"
            onAddToCart={handleAddToCart}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </div>

        <div id="accessories">
          <ProductSection
            title="👜 Accessories"
            products={accessories}
            category="Accessories"
            categoryId="accessories"
            onAddToCart={handleAddToCart}
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          />
        </div>

        <div id="home-decor">
          <ProductSection
            title="🏠 Home & Decor"
            products={homeDecor}
            category="Home Decor"
            categoryId="home-decor"
            onAddToCart={handleAddToCart}
            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
          />
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

export default HomePage;
