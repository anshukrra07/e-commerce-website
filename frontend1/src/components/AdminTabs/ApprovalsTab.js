import React from 'react';

/**
 * ApprovalsTab Component
 * Manages pending seller registrations and product listings
 * Props:
 * - sellers: array of pending sellers
 * - products: array of pending products
 * - onApproveSeller: function to approve a seller
 * - onRejectSeller: function to reject a seller
 * - onApproveProduct: function to approve a product
 * - onRejectProduct: function to reject a product
 */
function ApprovalsTab({ 
  sellers, 
  products, 
  onApproveSeller, 
  onRejectSeller, 
  onApproveProduct, 
  onRejectProduct 
}) {
  return (
    <div className="approvals-section">
      {/* Pending Sellers Section */}
      <div className="sellers-section">
        <h2>Seller Registrations Awaiting Approval</h2>
        
        {sellers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <h3>All Caught Up!</h3>
            <p>No pending seller registrations at the moment.</p>
          </div>
        ) : (
          <div className="sellers-grid">
            {sellers.map(seller => (
              <div key={seller.id} className="seller-card">
                {/* Seller Header - Name and Date */}
                <div className="seller-card-header">
                  <div className="seller-info">
                    <h3>{seller.businessName}</h3>
                    <p className="seller-owner">{seller.ownerName}</p>
                  </div>
                  <div className="seller-date">
                    <span className="date-label">Submitted</span>
                    <span className="date-value">{seller.submittedDate}</span>
                  </div>
                </div>

                {/* Seller Details - Contact and Business Info */}
                <div className="seller-details">
                  <div className="detail-row">
                    <span className="detail-label">📧 Email:</span>
                    <span className="detail-value">{seller.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📞 Phone:</span>
                    <span className="detail-value">{seller.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📍 Address:</span>
                    <span className="detail-value">{seller.businessAddress}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🧾 GST:</span>
                    <span className="detail-value">{seller.gstNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🏦 Bank:</span>
                    <span className="detail-value">{seller.bankAccount}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="seller-actions">
                  <button
                    className="approve-btn"
                    onClick={() => onApproveSeller(seller.id)}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => onRejectSeller(seller.id)}
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Products Section */}
      <div className="products-section">
        <h2>Product Listings Awaiting Approval</h2>
        
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <h3>All Caught Up!</h3>
            <p>No pending product listings at the moment.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-approval-card">
                {/* Product Header - Icon and Date */}
                <div className="product-approval-header">
                  <div className="product-emoji">{product.emoji}</div>
                  <div className="product-date">
                    <span className="date-label">Submitted</span>
                    <span className="date-value">{product.submittedDate}</span>
                  </div>
                </div>

                {/* Product Details */}
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">
                  Category: <strong>{product.category}</strong>
                </p>
                <p className="product-description">{product.description}</p>

                {/* Pricing Information */}
                <div className="product-pricing">
                  <span className="product-price">₹{product.price}</span>
                  <span className="product-original">₹{product.original}</span>
                  <span className="product-discount">
                    {Math.round(((product.original - product.price) / product.original) * 100)}% OFF
                  </span>
                </div>

                {/* Seller Information */}
                <div className="product-seller-info">
                  <span className="seller-label">👤 Seller:</span>
                  <span className="seller-name">{product.seller}</span>
                </div>

                {/* Action Buttons */}
                <div className="product-actions">
                  <button
                    className="approve-btn"
                    onClick={() => onApproveProduct(product.id)}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => onRejectProduct(product.id)}
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApprovalsTab;
