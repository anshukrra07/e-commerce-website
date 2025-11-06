import React from 'react';

/**
 * ProductsTab Component
 * Manages seller's product listings with add/edit/delete functionality
 * Props:
 * - myProducts: array of seller's products
 * - showAddModal: boolean to show/hide modal
 * - editingProduct: currently editing product or null
 * - formData: form data object
 * - categories: array of category options
 * - onOpenModal: function to open add/edit modal
 * - onCloseModal: function to close modal
 * - onEditProduct: function to start editing a product
 * - onDeleteProduct: function to delete a product
 * - onFormChange: function to update form data
 * - onSubmit: function to submit form (create/update)
 */
function ProductsTab({
  myProducts,
  showAddModal,
  editingProduct,
  formData,
  categories,
  onOpenModal,
  onCloseModal,
  onEditProduct,
  onDeleteProduct,
  onFormChange,
  onSubmit
}) {
  return (
    <div className="products-tab">
      {/* Header with Add Button */}
      <div className="products-header">
        <h2>My Products ({myProducts.length})</h2>
        <button className="add-product-btn" onClick={onOpenModal}>
          ➕ Add New Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {myProducts.map(product => (
          <div key={product.id} className="product-card">
            {/* Product Image/Icon */}
            <div className="product-image">{product.image}</div>

            {/* Product Info */}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-desc">{product.description}</p>
            </div>

            {/* Status Badge */}
            <div className={`product-status ${product.status}`}>
              {product.status === 'approved' && '✅ Approved'}
              {product.status === 'pending' && '⏳ Pending'}
              {product.status === 'rejected' && '❌ Rejected'}
            </div>

            {/* Price & Stock Info */}
            <div className="product-stats">
              <div className="stat-item">
                <span className="stat-label">Price:</span>
                <span className="stat-value">₹{product.price}</span>
                {product.discount > 0 && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>
              <div className="stat-item">
                <span className="stat-label">Stock:</span>
                <span className={`stat-value ${product.stock < 20 ? 'low-stock' : ''}`}>
                  {product.stock} units
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Sold:</span>
                <span className="stat-value">{product.sold} units</span>
              </div>
              {product.revenue && (
                <div className="stat-item">
                  <span className="stat-label">Revenue:</span>
                  <span className="stat-value">₹{(product.revenue / 1000).toFixed(1)}K</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                className="edit-btn"
                onClick={() => onEditProduct(product)}
              >
                ✏️ Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDeleteProduct(product.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={onCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={onCloseModal}>✕</button>
            </div>

            <form className="product-form" onSubmit={onSubmit}>
              {/* Product Name */}
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => onFormChange('name', e.target.value)}
                  placeholder="e.g. Wireless Headphones"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => onFormChange('category', e.target.value)}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => onFormChange('description', e.target.value)}
                  placeholder="Product description..."
                  rows="3"
                />
              </div>

              {/* Price and Discount */}
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => onFormChange('price', e.target.value)}
                    placeholder="2999"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => onFormChange('discount', e.target.value)}
                    placeholder="10"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Stock and Image Icon */}
              <div className="form-row">
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => onFormChange('stock', e.target.value)}
                    placeholder="100"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image Icon (Emoji)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => onFormChange('image', e.target.value)}
                    placeholder="🎧"
                    maxLength="2"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsTab;
