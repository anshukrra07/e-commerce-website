import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../styles/SellerDashboard/SellerDashboard.css';
import '../styles/SellerDashboard/OverviewTab.css';
import '../styles/SellerDashboard/ProductsTab.css';
import '../styles/SellerDashboard/OrdersTab.css';
import '../styles/SellerDashboard/AnalyticsTab.css';
import '../styles/SellerDashboard/InventoryTab.css';
import '../styles/SellerDashboard/ReviewsTab.css';
import '../styles/SellerDashboard/Responsive.css';

// Import Tab Components
import OverviewTab from '../components/SellerTabs/OverviewTab';
import ProductsTab from '../components/SellerTabs/ProductsTab';
import OrdersTab from '../components/SellerTabs/OrdersTab';
import AnalyticsTab from '../components/SellerTabs/AnalyticsTab';
import InventoryTab from '../components/SellerTabs/InventoryTab';
import ReviewsTab from '../components/SellerTabs/ReviewsTab';

/**
 * SellerDashboard Component
 * Main seller dashboard with 6 tabs for managing products, orders, analytics, etc.
 * Uses modular tab components for better organization and maintainability
 */
const SellerDashboard = ({ isLoggedIn, userName, userRole, onLoginSuccess, onLogout }) => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal and form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    price: '',
    discount: 0,
    stock: '',
    image: '',
    description: ''
  });

  // Products State
  const [myProducts, setMyProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      category: 'electronics',
      price: 3999,
      discount: 20,
      stock: 50,
      sold: 245,
      image: '🎧',
      description: 'Premium wireless headphones with noise cancellation',
      status: 'approved',
      revenue: 979755
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      category: 'electronics',
      price: 8999,
      discount: 15,
      stock: 30,
      sold: 128,
      image: '⌚',
      description: 'Advanced fitness tracking smartwatch',
      status: 'approved',
      revenue: 1151872
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      category: 'electronics',
      price: 2499,
      discount: 10,
      stock: 75,
      sold: 89,
      image: '🔊',
      description: 'Portable wireless speaker with amazing sound',
      status: 'pending',
      revenue: 222411
    }
  ]);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: '#ORD-1001',
      productName: 'Wireless Headphones Pro',
      customer: 'Rajesh Kumar',
      quantity: 2,
      total: 7998,
      status: 'delivered',
      date: '2024-01-15',
      payment: 'paid'
    },
    {
      id: '#ORD-1002',
      productName: 'Smart Watch Series 5',
      customer: 'Priya Sharma',
      quantity: 1,
      total: 8999,
      status: 'shipped',
      date: '2024-01-16',
      payment: 'paid'
    },
    {
      id: '#ORD-1003',
      productName: 'Bluetooth Speaker',
      customer: 'Amit Patel',
      quantity: 3,
      total: 7497,
      status: 'processing',
      date: '2024-01-17',
      payment: 'pending'
    },
    {
      id: '#ORD-1004',
      productName: 'Wireless Headphones Pro',
      customer: 'Sneha Reddy',
      quantity: 1,
      total: 3999,
      status: 'return-requested',
      date: '2024-01-14',
      payment: 'paid'
    }
  ]);

  // Reviews State
  const [reviews] = useState({
    products: [
      {
        id: 1,
        productName: 'Wireless Headphones Pro',
        productIcon: '🎧',
        customerName: 'Rajesh Kumar',
        rating: 5,
        comment: 'Excellent product! Sound quality is amazing and battery life is great.',
        date: '2024-01-15',
        verified: true,
        helpful: 24
      },
      {
        id: 2,
        productName: 'Smart Watch Series 5',
        productIcon: '⌚',
        customerName: 'Priya Sharma',
        rating: 4,
        comment: 'Good smartwatch. Fitness tracking is accurate but battery could be better.',
        date: '2024-01-14',
        verified: true,
        helpful: 18
      },
      {
        id: 3,
        productName: 'Wireless Headphones Pro',
        productIcon: '🎧',
        customerName: 'Amit Patel',
        rating: 5,
        comment: 'Best headphones I have ever used. Noise cancellation is top-notch!',
        date: '2024-01-13',
        verified: true,
        helpful: 31
      },
      {
        id: 4,
        productName: 'Bluetooth Speaker',
        productIcon: '🔊',
        customerName: 'Sneha Reddy',
        rating: 3,
        comment: 'Decent speaker for the price. Bass could be stronger.',
        date: '2024-01-12',
        verified: false,
        helpful: 7
      }
    ],
    seller: [
      {
        id: 1,
        customerName: 'Vikram Singh',
        rating: 5,
        comment: 'Excellent seller! Fast shipping and great product quality. Highly recommended!',
        date: '2024-01-16',
        verified: true
      },
      {
        id: 2,
        customerName: 'Kavita Desai',
        rating: 4,
        comment: 'Good service. Products are as described. Packaging could be better.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 3,
        customerName: 'Rahul Mehta',
        rating: 5,
        comment: 'Amazing seller! Quick response to queries and fast delivery.',
        date: '2024-01-14',
        verified: true
      }
    ]
  });

  // Category options for product form
  const categories = [
    { value: 'electronics', label: '📱 Electronics' },
    { value: 'clothing', label: '👕 Clothing' },
    { value: 'footwear', label: '👟 Footwear' },
    { value: 'accessories', label: '💍 Accessories' },
    { value: 'home-decor', label: '🏠 Home Decor' }
  ];

  // Calculate analytics
  const analytics = {
    totalRevenue: myProducts.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalOrders: orders.length,
    totalSold: myProducts.reduce((sum, p) => sum + (p.sold || 0), 0),
    avgOrderValue: orders.reduce((sum, o) => sum + o.total, 0) / orders.length,
    revenueGrowth: 23.5,
    ordersThisMonth: 127,
    bestSelling: myProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0))[0]
  };

  // ===== EVENT HANDLERS =====

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleOpenModal = () => {
    setShowAddModal(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'electronics',
      price: '',
      discount: 0,
      stock: '',
      image: '',
      description: ''
    });
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'electronics',
      price: '',
      discount: 0,
      stock: '',
      image: '',
      description: ''
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      image: product.image,
      description: product.description
    });
    setShowAddModal(true);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = myProducts.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              ...formData,
              price: parseFloat(formData.price),
              discount: parseFloat(formData.discount),
              stock: parseInt(formData.stock),
              status: 'pending'
            }
          : p
      );
      setMyProducts(updatedProducts);
      alert('Product updated and submitted for admin approval!');
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        stock: parseInt(formData.stock),
        sold: 0,
        revenue: 0,
        status: 'pending'
      };
      setMyProducts([...myProducts, newProduct]);
      alert('Product submitted for admin approval!');
    }
    
    handleCloseModal();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setMyProducts(myProducts.filter(p => p.id !== id));
      alert('Product deleted successfully!');
    }
  };

  const handleOrderAction = (orderId, action) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        if (action === 'approve-return') {
          return { ...order, status: 'returned', payment: 'refunded' };
        } else if (action === 'ship') {
          return { ...order, status: 'shipped' };
        }
      }
      return order;
    });
    setOrders(updatedOrders);
    alert(`Order ${orderId} ${action === 'approve-return' ? 'return approved' : 'marked as shipped'}!`);
  };

  return (
    <div className="seller-dashboard-page">
      <Header
        cartCount={0}
        onLoginClick={() => {}}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        onLogout={onLogout}
      />

      <div className="seller-dashboard">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1>🏪 Seller Dashboard</h1>
          <p>Welcome back, {userName}!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products
          </button>
          <button
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📋 Orders ({orders.length})
          </button>
          <button
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
          <button
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            📊 Inventory
          </button>
          <button
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            ⭐ Reviews ({reviews.products.length + reviews.seller.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="dashboard-content">
          {activeTab === 'dashboard' && (
            <OverviewTab
              analytics={analytics}
              myProducts={myProducts}
              orders={orders}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab
              myProducts={myProducts}
              showAddModal={showAddModal}
              editingProduct={editingProduct}
              formData={formData}
              categories={categories}
              onOpenModal={handleOpenModal}
              onCloseModal={handleCloseModal}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onFormChange={handleFormChange}
              onSubmit={handleSubmitProduct}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              onOrderAction={handleOrderAction}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              myProducts={myProducts}
              analytics={analytics}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryTab
              myProducts={myProducts}
            />
          )}

          {activeTab === 'reviews' && (
            <ReviewsTab
              reviews={reviews}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
