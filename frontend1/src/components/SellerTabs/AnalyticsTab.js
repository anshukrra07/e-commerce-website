import React from 'react';

/**
 * AnalyticsTab Component
 * Shows seller analytics including revenue trends and customer metrics
 * Props:
 * - myProducts: array of seller's products
 * - analytics: object with various metrics
 */
function AnalyticsTab({ myProducts, analytics }) {
  // Monthly revenue data (last 4 months)
  const monthlyRevenue = [
    { month: 'Jan', revenue: 89234 },
    { month: 'Feb', revenue: 112450 },
    { month: 'Mar', revenue: 134789 },
    { month: 'Apr', revenue: 156890 }
  ];

  // Top 5 products by sales
  const topProducts = myProducts
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5);

  return (
    <div className="analytics-tab">
      <h2>📈 Sales Analytics</h2>

      {/* Revenue Trend Chart */}
      <div className="analytics-section">
        <h3>Monthly Revenue Trend</h3>
        <div className="revenue-chart">
          {monthlyRevenue.map((item, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar" 
                style={{ height: `${(item.revenue / 2000)}px` }}
              >
                <span className="bar-value">₹{(item.revenue / 1000).toFixed(0)}K</span>
              </div>
              <div className="chart-label">{item.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="analytics-section">
        <h3>🏆 Top 5 Best Selling Products</h3>
        <div className="top-products-list">
          {topProducts.map((product, index) => (
            <div key={product.id} className="top-product-item">
              <div className="product-rank">#{index + 1}</div>
              <div className="product-icon">{product.image}</div>
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-stats">
                  <span className="stat">{product.sold} sold</span>
                  <span className="stat">₹{(product.revenue / 1000).toFixed(1)}K revenue</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Trends */}
      <div className="analytics-section">
        <h3>👥 Customer Trends</h3>
        <div className="customer-metrics">
          <div className="metric-box">
            <div className="metric-icon">🆕</div>
            <div className="metric-content">
              <div className="metric-value">87</div>
              <div className="metric-label">New Customers</div>
              <div className="metric-change positive">↑ 12%</div>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">🔄</div>
            <div className="metric-content">
              <div className="metric-value">156</div>
              <div className="metric-label">Repeat Customers</div>
              <div className="metric-change positive">↑ 8%</div>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">⭐</div>
            <div className="metric-content">
              <div className="metric-value">4.7</div>
              <div className="metric-label">Customer Rating</div>
              <div className="metric-change positive">↑ 0.2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsTab;
