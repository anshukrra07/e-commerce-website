import React from 'react';

/**
 * BannersTab Component
 * Manages promotional banners and site-wide announcements
 * Props:
 * - banners: array of promotional banners
 * - showBannerForm: boolean to show/hide form
 * - editingBanner: currently editing banner object or null
 * - bannerFormData: form data object
 * - onFormDataChange: function to update form data
 * - onShowForm: function to show form
 * - onHideForm: function to hide form
 * - onSubmitBanner: function to submit banner (create/update)
 * - onEditBanner: function to start editing a banner
 * - onDeleteBanner: function to delete a banner
 * - onToggleStatus: function to toggle banner active/inactive status
 */
function BannersTab({ 
  banners, 
  showBannerForm,
  editingBanner,
  bannerFormData,
  onFormDataChange,
  onShowForm,
  onHideForm,
  onSubmitBanner,
  onEditBanner,
  onDeleteBanner,
  onToggleStatus
}) {
  // Helper function to get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      active: { icon: '✅', text: 'Active', class: 'status-active' },
      inactive: { icon: '⏸️', text: 'Inactive', class: 'status-inactive' },
      scheduled: { icon: '📅', text: 'Scheduled', class: 'status-scheduled' },
      expired: { icon: '⏰', text: 'Expired', class: 'status-expired' }
    };
    return statusMap[status] || statusMap.inactive;
  };

  return (
    <div className="banners-section">
      <div className="banners-header">
        <h2>🎞️ Promotional Banners</h2>
        <button 
          className="create-banner-btn"
          onClick={onShowForm}
        >
          ➕ Create New Banner
        </button>
      </div>

      {/* Banner Creation/Edit Form */}
      {showBannerForm && (
        <div className="banner-form-overlay">
          <div className="banner-form-modal">
            <div className="form-modal-header">
              <h3>{editingBanner ? 'Edit Banner' : 'Create New Banner'}</h3>
              <button className="close-btn" onClick={onHideForm}>✕</button>
            </div>
            
            <form className="banner-form" onSubmit={onSubmitBanner}>
              {/* Title Input */}
              <div className="form-group">
                <label>Banner Title *</label>
                <input
                  type="text"
                  value={bannerFormData.title}
                  onChange={(e) => onFormDataChange('title', e.target.value)}
                  placeholder="e.g. Summer Sale 2024"
                  required
                />
              </div>

              {/* Subtitle Input */}
              <div className="form-group">
                <label>Subtitle *</label>
                <input
                  type="text"
                  value={bannerFormData.subtitle}
                  onChange={(e) => onFormDataChange('subtitle', e.target.value)}
                  placeholder="e.g. Up to 70% OFF on Fashion"
                  required
                />
              </div>

              {/* Color Inputs */}
              <div className="form-row">
                <div className="form-group">
                  <label>Background Color</label>
                  <input
                    type="color"
                    value={bannerFormData.backgroundColor}
                    onChange={(e) => onFormDataChange('backgroundColor', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Text Color</label>
                  <input
                    type="color"
                    value={bannerFormData.textColor}
                    onChange={(e) => onFormDataChange('textColor', e.target.value)}
                  />
                </div>
              </div>

              {/* Button Configuration */}
              <div className="form-row">
                <div className="form-group">
                  <label>Button Text</label>
                  <input
                    type="text"
                    value={bannerFormData.buttonText}
                    onChange={(e) => onFormDataChange('buttonText', e.target.value)}
                    placeholder="e.g. Shop Now"
                  />
                </div>
                <div className="form-group">
                  <label>Button Link</label>
                  <input
                    type="text"
                    value={bannerFormData.buttonLink}
                    onChange={(e) => onFormDataChange('buttonLink', e.target.value)}
                    placeholder="e.g. /products/fashion"
                  />
                </div>
              </div>

              {/* Position and Status */}
              <div className="form-row">
                <div className="form-group">
                  <label>Position</label>
                  <select
                    value={bannerFormData.position}
                    onChange={(e) => onFormDataChange('position', e.target.value)}
                  >
                    <option value="homepage-top">Homepage - Top</option>
                    <option value="homepage-middle">Homepage - Middle</option>
                    <option value="seller-dashboard">Seller Dashboard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={bannerFormData.priority}
                    onChange={(e) => onFormDataChange('priority', parseInt(e.target.value))}
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    value={bannerFormData.startDate}
                    onChange={(e) => onFormDataChange('startDate', e.target.value)}
                    placeholder="e.g. 01 May 2024"
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    value={bannerFormData.endDate}
                    onChange={(e) => onFormDataChange('endDate', e.target.value)}
                    placeholder="e.g. 31 May 2024"
                  />
                </div>
              </div>

              {/* Banner Preview */}
              <div className="banner-preview">
                <h4>Preview:</h4>
                <div 
                  className="preview-banner"
                  style={{
                    backgroundColor: bannerFormData.backgroundColor,
                    color: bannerFormData.textColor
                  }}
                >
                  <div className="preview-content">
                    <h3>{bannerFormData.title || 'Banner Title'}</h3>
                    <p>{bannerFormData.subtitle || 'Banner subtitle'}</p>
                    <button className="preview-btn">{bannerFormData.buttonText || 'Button'}</button>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onHideForm}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banners List */}
      <div className="banners-list">
        {banners.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎞️</div>
            <h3>No Banners</h3>
            <p>Create your first promotional banner to get started.</p>
          </div>
        ) : (
          <div className="banners-grid">
            {banners.map(banner => {
              const statusInfo = getStatusBadge(banner.status);
              return (
                <div key={banner.id} className="banner-card">
                  {/* Banner Preview */}
                  <div 
                    className="banner-preview-small"
                    style={{
                      backgroundColor: banner.backgroundColor,
                      color: banner.textColor
                    }}
                  >
                    <h4>{banner.title}</h4>
                    <p>{banner.subtitle}</p>
                  </div>

                  {/* Banner Info */}
                  <div className="banner-info">
                    <div className="banner-meta">
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.icon} {statusInfo.text}
                      </span>
                      <span className="banner-position">📍 {banner.position}</span>
                    </div>
                    
                    <div className="banner-dates">
                      <div>📅 {banner.startDate} - {banner.endDate}</div>
                    </div>

                    <div className="banner-stats">
                      <span>👁️ {banner.impressions.toLocaleString()} views</span>
                      <span>🖱️ {banner.clicks.toLocaleString()} clicks</span>
                      {banner.clicks > 0 && (
                        <span>📊 {((banner.clicks / banner.impressions) * 100).toFixed(2)}% CTR</span>
                      )}
                    </div>
                  </div>

                  {/* Banner Actions */}
                  <div className="banner-actions">
                    <button 
                      className="banner-action-btn edit"
                      onClick={() => onEditBanner(banner.id)}
                      title="Edit banner"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="banner-action-btn toggle"
                      onClick={() => onToggleStatus(banner.id)}
                      title={banner.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {banner.status === 'active' ? '⏸️ Pause' : '▶️ Activate'}
                    </button>
                    <button 
                      className="banner-action-btn delete"
                      onClick={() => onDeleteBanner(banner.id)}
                      title="Delete banner"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BannersTab;
