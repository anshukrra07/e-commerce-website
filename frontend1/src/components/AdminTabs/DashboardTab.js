import React from 'react';
import { platformAnalytics } from '../../data/platformAnalytics';

function DashboardTab() {
  return (
    <div className="dashboard-section">
      <h2>Platform Analytics Overview</h2>
      
      <div className="analytics-cards">
        <div className="analytics-card revenue">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <div className="card-label">Total Revenue</div>
            <div className="card-value">₹{(platformAnalytics.overview.totalRevenue / 100000).toFixed(2)}L+</div>
            <div className="card-growth positive">↑ {platformAnalytics.overview.revenueGrowth}%</div>
          </div>
        </div>
        <div className="analytics-card orders">
          <div className="card-icon">📦</div>
          <div className="card-content">
            <div className="card-label">Total Orders</div>
            <div className="card-value">{platformAnalytics.overview.totalOrders.toLocaleString()}</div>
            <div className="card-growth positive">↑ {platformAnalytics.overview.ordersGrowth}%</div>
          </div>
        </div>
        <div className="analytics-card users">
          <div className="card-icon">👥</div>
          <div className="card-content">
            <div className="card-label">Total Users</div>
            <div className="card-value">{platformAnalytics.overview.totalUsers.toLocaleString()}</div>
            <div className="card-growth positive">↑ {platformAnalytics.overview.usersGrowth}%</div>
          </div>
        </div>
        <div className="analytics-card sellers">
          <div className="card-icon">🏪</div>
          <div className="card-content">
            <div className="card-label">Active Sellers</div>
            <div className="card-value">{platformAnalytics.overview.activeSellers}</div>
            <div className="card-growth positive">↑ {platformAnalytics.overview.sellersGrowth}%</div>
          </div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-section">
          <h3>📈 Monthly Revenue Trend</h3>
          <div className="revenue-chart">
            {platformAnalytics.monthlyRevenue.map((item, index) => (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar" style={{height: `${(item.revenue / 10000)}px`}}>
                  <span className="bar-value">₹{(item.revenue / 1000).toFixed(0)}K</span>
                </div>
                <div className="chart-label">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>📅 Category Performance</h3>
          <div className="category-performance">
            {platformAnalytics.categoryPerformance.map((cat, index) => (
              <div key={index} className="category-row">
                <div className="category-name">{cat.category}</div>
                <div className="category-stats">
                  <span className="category-sales">₹{(cat.sales / 100000).toFixed(2)}L</span>
                  <span className="category-orders">{cat.orders} orders</span>
                  <span className={`category-growth ${cat.growth >= 0 ? 'positive' : 'negative'}`}>
                    {cat.growth >= 0 ? '↑' : '↓'} {Math.abs(cat.growth)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Performance Section */}
      <div className="analytics-section">
        <h3>💹 Sales Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-box">
            <div className="metric-icon">📊</div>
            <div className="metric-content">
              <div className="metric-label">Average Order Value</div>
              <div className="metric-value">₹{(platformAnalytics.overview.totalRevenue / platformAnalytics.overview.totalOrders).toFixed(0)}</div>
              <div className="metric-change positive">↑ 8.5% from last month</div>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">🎯</div>
            <div className="metric-content">
              <div className="metric-label">Conversion Rate</div>
              <div className="metric-value">3.7%</div>
              <div className="metric-change positive">↑ 0.4% improvement</div>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">⚡</div>
            <div className="metric-content">
              <div className="metric-label">Daily Sales Average</div>
              <div className="metric-value">₹{((platformAnalytics.overview.totalRevenue / 30) / 1000).toFixed(1)}K</div>
              <div className="metric-change positive">↑ 12% this week</div>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon">🔄</div>
            <div className="metric-content">
              <div className="metric-label">Return Rate</div>
              <div className="metric-value">2.3%</div>
              <div className="metric-change negative">↓ 0.8% improvement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Levels Overview */}
      <div className="analytics-section">
        <h3>📦 Inventory & Stock Levels</h3>
        <div className="stock-overview-grid">
          <div className="stock-card total">
            <div className="stock-icon">📊</div>
            <div className="stock-info">
              <div className="stock-label">Total Products</div>
              <div className="stock-value">2,847</div>
              <div className="stock-subtext">Active listings</div>
            </div>
          </div>
          <div className="stock-card in-stock">
            <div className="stock-icon">✅</div>
            <div className="stock-info">
              <div className="stock-label">In Stock</div>
              <div className="stock-value">2,456</div>
              <div className="stock-percentage">86.3%</div>
            </div>
          </div>
          <div className="stock-card low-stock">
            <div className="stock-icon">⚠️</div>
            <div className="stock-info">
              <div className="stock-label">Low Stock</div>
              <div className="stock-value">287</div>
              <div className="stock-percentage">10.1%</div>
            </div>
          </div>
          <div className="stock-card out-of-stock">
            <div className="stock-icon">❌</div>
            <div className="stock-info">
              <div className="stock-label">Out of Stock</div>
              <div className="stock-value">104</div>
              <div className="stock-percentage">3.6%</div>
            </div>
          </div>
        </div>

        {/* Category Stock Levels */}
        <div className="category-stock-section">
          <h4>Stock Levels by Category</h4>
          <div className="category-stock-bars">
            {[
              { category: 'Electronics', inStock: 856, lowStock: 67, outOfStock: 23, total: 946 },
              { category: 'Fashion', inStock: 543, lowStock: 89, outOfStock: 34, total: 666 },
              { category: 'Home & Kitchen', inStock: 432, lowStock: 45, outOfStock: 18, total: 495 },
              { category: 'Books', inStock: 378, lowStock: 52, outOfStock: 15, total: 445 },
              { category: 'Sports', inStock: 247, lowStock: 34, outOfStock: 14, total: 295 }
            ].map((cat, index) => (
              <div key={index} className="category-stock-row">
                <div className="category-stock-label">{cat.category}</div>
                <div className="category-stock-bar">
                  <div 
                    className="stock-segment in-stock" 
                    style={{width: `${(cat.inStock / cat.total) * 100}%`}}
                    title={`In Stock: ${cat.inStock}`}
                  >
                    {cat.inStock}
                  </div>
                  <div 
                    className="stock-segment low-stock" 
                    style={{width: `${(cat.lowStock / cat.total) * 100}%`}}
                    title={`Low Stock: ${cat.lowStock}`}
                  >
                    {cat.lowStock}
                  </div>
                  <div 
                    className="stock-segment out-of-stock" 
                    style={{width: `${(cat.outOfStock / cat.total) * 100}%`}}
                    title={`Out of Stock: ${cat.outOfStock}`}
                  >
                    {cat.outOfStock}
                  </div>
                </div>
                <div className="category-stock-total">{cat.total} total</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth Trends */}
      <div className="analytics-section">
        <h3>📈 Growth Trends & Insights</h3>
        <div className="growth-trends-grid">
          <div className="trend-card">
            <div className="trend-header">
              <div className="trend-icon">🚀</div>
              <div className="trend-title">Revenue Growth</div>
            </div>
            <div className="trend-chart-mini">
              <div className="mini-bars">
                {[65, 72, 68, 78, 85, 92, 100].map((val, i) => (
                  <div key={i} className="mini-bar" style={{height: `${val}%`}}></div>
                ))}
              </div>
            </div>
            <div className="trend-stats">
              <div className="trend-value">+{platformAnalytics.overview.revenueGrowth}%</div>
              <div className="trend-period">Last 7 days</div>
            </div>
          </div>

          <div className="trend-card">
            <div className="trend-header">
              <div className="trend-icon">👥</div>
              <div className="trend-title">User Acquisition</div>
            </div>
            <div className="trend-chart-mini">
              <div className="mini-bars">
                {[58, 65, 72, 68, 75, 82, 88].map((val, i) => (
                  <div key={i} className="mini-bar" style={{height: `${val}%`}}></div>
                ))}
              </div>
            </div>
            <div className="trend-stats">
              <div className="trend-value">+{platformAnalytics.overview.usersGrowth}%</div>
              <div className="trend-period">Last 7 days</div>
            </div>
          </div>

          <div className="trend-card">
            <div className="trend-header">
              <div className="trend-icon">🛍️</div>
              <div className="trend-title">Order Volume</div>
            </div>
            <div className="trend-chart-mini">
              <div className="mini-bars">
                {[70, 68, 75, 82, 78, 85, 92].map((val, i) => (
                  <div key={i} className="mini-bar" style={{height: `${val}%`}}></div>
                ))}
              </div>
            </div>
            <div className="trend-stats">
              <div className="trend-value">+{platformAnalytics.overview.ordersGrowth}%</div>
              <div className="trend-period">Last 7 days</div>
            </div>
          </div>

          <div className="trend-card">
            <div className="trend-header">
              <div className="trend-icon">⭐</div>
              <div className="trend-title">Customer Satisfaction</div>
            </div>
            <div className="trend-chart-mini">
              <div className="mini-bars">
                {[88, 90, 89, 91, 92, 93, 95].map((val, i) => (
                  <div key={i} className="mini-bar" style={{height: `${val}%`}}></div>
                ))}
              </div>
            </div>
            <div className="trend-stats">
              <div className="trend-value">4.8/5.0</div>
              <div className="trend-period">+0.3 this month</div>
            </div>
          </div>
        </div>
      </div>

      <div className="top-sellers-section">
        <h3>🏆 Top Performing Sellers</h3>
        <div className="top-sellers-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Seller</th>
                <th>Revenue</th>
                <th>Orders</th>
                <th>Rating</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {platformAnalytics.topSellers.map((seller, index) => (
                <tr key={seller.id}>
                  <td><div className="rank-badge">#{index + 1}</div></td>
                  <td><strong>{seller.name}</strong></td>
                  <td>₹{(seller.revenue / 100000).toFixed(2)}L</td>
                  <td>{seller.orders.toLocaleString()}</td>
                  <td><span className="rating">⭐ {seller.rating}</span></td>
                  <td><span className="growth positive">↑ {seller.growth}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardTab;
