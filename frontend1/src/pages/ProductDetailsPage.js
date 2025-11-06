import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Footer from '../components/Footer/Footer';
import LoginModal from '../components/LoginModal/LoginModal';
import '../styles/Pages/ProductDetailsPage.css';

// Import all products
import { electronics, clothes, shoes, accessories, homeDecor } from '../data/products';
import { trendingProducts } from '../data/trendingProducts';

const ProductDetailsPage = ({ isLoggedIn, userName, userRole, onLoginSuccess, onLogout }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get all products
  const allProducts = [...electronics, ...clothes, ...shoes, ...accessories, ...homeDecor, ...trendingProducts];
  const product = allProducts.find(p => p.id === parseInt(productId));

  if (!product) {
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
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </div>
    );
  }

  // Generate mock images (in real app, these would come from product data)
  const productImages = [
    product.emoji,
    product.emoji,
    product.emoji,
    product.emoji
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      userName: 'Rajesh Kumar',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent product! Worth every penny. The quality is outstanding and delivery was super fast.',
      verified: true,
      helpful: 45
    },
    {
      id: 2,
      userName: 'Priya Sharma',
      rating: 4,
      date: '1 week ago',
      comment: 'Good product overall. Meets expectations. Would have been 5 stars if packaging was better.',
      verified: true,
      helpful: 23
    },
    {
      id: 3,
      userName: 'Amit Patel',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Amazing quality and fast delivery. Highly recommended!',
      verified: false,
      helpful: 12
    },
    {
      id: 4,
      userName: 'Sneha Reddy',
      rating: 3,
      date: '3 weeks ago',
      comment: 'It\'s okay. Does the job but nothing exceptional.',
      verified: true,
      helpful: 8
    }
  ];

  // Product specifications
  const specifications = {
    'Brand': product.seller || 'Generic',
    'Model': product.name,
    'Color': 'Multiple Options',
    'Material': 'Premium Quality',
    'Warranty': '1 Year Manufacturer Warranty',
    'Country of Origin': 'India'
  };

  // Product features
  const features = [
    'Premium Quality Material',
    'Durable and Long-lasting',
    'Easy to Use',
    'Stylish Design',
    'Value for Money',
    'Fast Delivery Available'
  ];

  const handleAddToCart = () => {
    setCartCount(cartCount + quantity);
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${quantity} ${product.name} - Total: ₹${(product.price * quantity).toLocaleString()}`);
  };

  const getSellerSlug = (sellerName) => {
    return sellerName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const discount = Math.round(((product.original - product.price) / product.original) * 100);

  return (
    <div className="product-details-page">
      <Header 
        cartCount={cartCount} 
        onLoginClick={() => setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        onLogout={onLogout}
      />
      <CategoryNav />

      <div className="container">
        <div className="breadcrumb">
          <button onClick={() => navigate('/')}>Home</button>
          <span>/</span>
          <button onClick={() => navigate(-1)}>Products</button>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-details-container">
          {/* Images Section */}
          <div className="product-images-section">
            <div className="main-image">
              <div className="main-image-display">
                {productImages[selectedImage]}
              </div>
            </div>
            <div className="image-thumbnails">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  {img}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating-row">
              <div className="rating-display">
                <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
                <span className="rating-number">{product.rating}</span>
              </div>
              <span className="reviews-count">(2,847 ratings & 512 reviews)</span>
            </div>

            {product.seller && (
              <div className="seller-info-box">
                <span className="seller-label">Sold by:</span>
                <button 
                  className="seller-name-link"
                  onClick={() => navigate(`/shop/${getSellerSlug(product.seller)}`)}
                >
                  🏪 {product.seller}
                </button>
              </div>
            )}

            <div className="price-section">
              <div className="current-price">₹{product.price.toLocaleString()}</div>
              <div className="original-price">₹{product.original.toLocaleString()}</div>
              <div className="discount-badge">{discount}% OFF</div>
            </div>

            <div className="savings-info">
              You save: ₹{(product.original - product.price).toLocaleString()}
            </div>

            <div className="stock-info">
              {product.inStock ? (
                <span className="in-stock">✅ In Stock</span>
              ) : (
                <span className="out-of-stock">❌ Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                🛒 Add to Cart
              </button>
              <button 
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders above ₹999</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">↩️</span>
                <div>
                  <strong>7 Days Return</strong>
                  <p>No questions asked</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">✅</span>
                <div>
                  <strong>Warranty</strong>
                  <p>1 Year Manufacturer Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button className="tab-btn active">Description</button>
            <button className="tab-btn">Specifications</button>
            <button className="tab-btn">Reviews ({reviews.length})</button>
          </div>

          <div className="tabs-content">
            {/* Description Tab */}
            <div className="tab-panel active">
              <h3>Product Description</h3>
              <p>
                Experience the perfect blend of quality and style with {product.name}. 
                Crafted with premium materials and designed with attention to detail, 
                this product offers exceptional value for money. Whether you're looking 
                for everyday use or special occasions, this product meets all your needs.
              </p>
              
              <h4>Key Features:</h4>
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            {/* Specifications Tab */}
            <div className="tab-panel">
              <h3>Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reviews Tab */}
            <div className="tab-panel">
              <div className="reviews-section">
                <div className="reviews-summary">
                  <h3>Customer Reviews</h3>
                  <div className="rating-breakdown">
                    <div className="overall-rating">
                      <div className="rating-score">{product.rating}</div>
                      <div className="rating-stars-large">
                        {'⭐'.repeat(Math.floor(product.rating))}
                      </div>
                      <div className="total-ratings">Based on 2,847 ratings</div>
                    </div>
                    <div className="rating-bars">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="rating-bar-row">
                          <span className="star-label">{star} ⭐</span>
                          <div className="rating-bar">
                            <div 
                              className="rating-bar-fill"
                              style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 10}%` }}
                            ></div>
                          </div>
                          <span className="rating-percent">{star === 5 ? 70 : star === 4 ? 20 : 10}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <div className="reviewer-name">
                              {review.userName}
                              {review.verified && (
                                <span className="verified-badge">✓ Verified Purchase</span>
                              )}
                            </div>
                            <div className="review-date">{review.date}</div>
                          </div>
                        </div>
                        <div className="review-rating">
                          {'⭐'.repeat(review.rating)}
                        </div>
                      </div>
                      <div className="review-comment">{review.comment}</div>
                      <div className="review-footer">
                        <button className="helpful-btn">
                          👍 Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

export default ProductDetailsPage;
