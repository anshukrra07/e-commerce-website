import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, category, onAddToCart }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  const getSellerSlug = (sellerName) => {
    return sellerName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleSellerClick = (e) => {
    e.stopPropagation();
    const sellerSlug = getSellerSlug(product.seller);
    navigate(`/shop/${sellerSlug}`);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} removed from wishlist!`);
    }
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    setIsComparing(!isComparing);
    if (!isComparing) {
      alert(`${product.name} added to compare!`);
    } else {
      alert(`${product.name} removed from compare!`);
    }
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image">
        <span style={{ fontSize: '4rem' }}>{product.emoji}</span>
        <div className="product-actions">
          <button 
            className={`action-icon wishlist-icon ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlist}
            title="Add to Wishlist"
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
          <button 
            className={`action-icon compare-icon ${isComparing ? 'active' : ''}`}
            onClick={handleCompare}
            title="Add to Compare"
          >
            ⚖️
          </button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{category}</div>
        <h3 className="product-name">{product.name}</h3>
        {product.seller && (
          <div className="product-seller" onClick={handleSellerClick}>
            <span className="seller-icon">🏪</span>
            <span className="seller-name">{product.seller}</span>
          </div>
        )}
        <div className="product-rating">
          {'⭐'.repeat(Math.floor(product.rating))} {product.rating}
        </div>
        <div className="product-price">
          ₹{product.price}
          <span className="original">₹{product.original}</span>
        </div>
        <button className="add-to-cart" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
