import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import '../styles/Pages/AdminDashboard.css';

// Import Mock Data
import { pendingSellers } from '../data/pendingSellers';
import { pendingProducts } from '../data/pendingProducts';
import { customerAccounts } from '../data/customerAccounts';
import { sellerAccounts } from '../data/sellerAccounts';
import { fraudReports } from '../data/fraudReports';
import { promotionalBanners } from '../data/promotionalBanners';

// Import Tab Components
import DashboardTab from '../components/AdminTabs/DashboardTab';
import ApprovalsTab from '../components/AdminTabs/ApprovalsTab';
import AccountsTab from '../components/AdminTabs/AccountsTab';
import FraudMonitorTab from '../components/AdminTabs/FraudMonitorTab';
import BannersTab from '../components/AdminTabs/BannersTab';

/**
 * AdminDashboard Component
 * Main admin panel with 5 tabs for comprehensive platform management:
 * 1. Dashboard - Platform analytics and overview
 * 2. Approvals - Seller registrations and product listings approval
 * 3. Accounts - Customer and seller account management
 * 4. Fraud Monitor - Security and fraud detection
 * 5. Banners - Promotional banner management
 */
function AdminDashboard({ isLoggedIn, userName, userRole, onLogout }) {
  const navigate = useNavigate();
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Approvals data state
  const [sellers, setSellers] = useState(pendingSellers);
  const [products, setProducts] = useState(pendingProducts);
  
  // Accounts data state
  const [customers, setCustomers] = useState(customerAccounts);
  const [sellersList, setSellersList] = useState(sellerAccounts);
  const [accountFilter, setAccountFilter] = useState('all');
  
  // Fraud data state
  const [fraudList, setFraudList] = useState(fraudReports);
  const [fraudFilter, setFraudFilter] = useState('all');
  
  // Banners data state
  const [banners, setBanners] = useState(promotionalBanners);
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerFormData, setBannerFormData] = useState({
    title: '',
    subtitle: '',
    backgroundColor: '#FF6B6B',
    textColor: '#FFFFFF',
    buttonText: 'Shop Now',
    buttonLink: '/products/all',
    position: 'homepage-top',
    startDate: '',
    endDate: '',
    status: 'active',
    priority: 1
  });

  // ===== APPROVALS TAB HANDLERS =====
  const handleApproveSeller = (sellerId) => {
    const seller = sellers.find(s => s.id === sellerId);
    if (seller) {
      alert(`✅ Seller "${seller.businessName}" has been approved!\n\nApproval email sent to: ${seller.email}`);
      setSellers(sellers.filter(s => s.id !== sellerId));
    }
  };

  const handleRejectSeller = (sellerId) => {
    const seller = sellers.find(s => s.id === sellerId);
    if (seller) {
      const reason = prompt(`Enter rejection reason for "${seller.businessName}":`);
      if (reason) {
        alert(`❌ Seller "${seller.businessName}" has been rejected.\n\nReason: ${reason}\nNotification email sent to: ${seller.email}`);
        setSellers(sellers.filter(s => s.id !== sellerId));
      }
    }
  };

  const handleApproveProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      alert(`✅ Product "${product.name}" has been approved!\n\nIt will now be visible to customers.`);
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleRejectProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const reason = prompt(`Enter rejection reason for "${product.name}":`);
      if (reason) {
        alert(`❌ Product "${product.name}" has been rejected.\n\nReason: ${reason}\nSeller "${product.seller}" has been notified.`);
        setProducts(products.filter(p => p.id !== productId));
      }
    }
  };

  // ===== ACCOUNTS TAB HANDLERS =====
  const handleAccountFilterChange = (filter) => {
    setAccountFilter(filter);
  };

  const handleSuspendAccount = (accountId, accountType) => {
    const list = accountType === 'customer' ? customers : sellersList;
    const setList = accountType === 'customer' ? setCustomers : setSellersList;
    const account = list.find(a => a.id === accountId);
    if (account) {
      const reason = prompt(`Enter reason for suspending ${account.name || account.businessName}:`);
      if (reason) {
        alert(`⚠️ Account "${account.name || account.businessName}" has been suspended.\n\nReason: ${reason}`);
        setList(list.map(a => a.id === accountId ? {...a, status: 'suspended', suspendedReason: reason} : a));
      }
    }
  };

  const handleActivateAccount = (accountId, accountType) => {
    const list = accountType === 'customer' ? customers : sellersList;
    const setList = accountType === 'customer' ? setCustomers : setSellersList;
    const account = list.find(a => a.id === accountId);
    if (account) {
      if (window.confirm(`Activate account for "${account.name || account.businessName}"?`)) {
        alert(`✅ Account "${account.name || account.businessName}" has been reactivated.`);
        setList(list.map(a => a.id === accountId ? {...a, status: 'active', suspendedReason: undefined} : a));
      }
    }
  };

  const handleDeleteAccount = (accountId, accountType) => {
    const list = accountType === 'customer' ? customers : sellersList;
    const setList = accountType === 'customer' ? setCustomers : setSellersList;
    const account = list.find(a => a.id === accountId);
    if (account) {
      if (window.confirm(`⚠️ Are you sure you want to permanently delete "${account.name || account.businessName}"?\n\nThis action cannot be undone.`)) {
        alert(`🗑️ Account "${account.name || account.businessName}" has been deleted.`);
        setList(list.filter(a => a.id !== accountId));
      }
    }
  };

  // ===== FRAUD MONITOR TAB HANDLERS =====
  const handleFraudFilterChange = (filter) => {
    setFraudFilter(filter);
  };

  const handleInvestigateFraud = (fraudId) => {
    setFraudList(fraudList.map(f => f.id === fraudId ? {...f, status: 'investigating'} : f));
    alert('Investigation started. Status updated to "Investigating".');
  };

  const handleResolveFraud = (fraudId) => {
    const fraud = fraudList.find(f => f.id === fraudId);
    if (fraud) {
      const action = prompt(`Enter resolution action for this ${fraud.type} fraud case:`);
      if (action) {
        setFraudList(fraudList.map(f => f.id === fraudId ? {...f, status: 'resolved', resolvedAction: action} : f));
        alert(`✅ Fraud case resolved.\n\nAction taken: ${action}`);
      }
    }
  };

  const handleDismissFraud = (fraudId) => {
    if (window.confirm('Dismiss this fraud report as false alarm?')) {
      setFraudList(fraudList.filter(f => f.id !== fraudId));
      alert('Fraud report dismissed.');
    }
  };

  // ===== BANNERS TAB HANDLERS =====
  const handleBannerFormDataChange = (field, value) => {
    setBannerFormData({...bannerFormData, [field]: value});
  };

  const handleShowBannerForm = () => {
    setShowBannerForm(true);
    setEditingBanner(null);
    setBannerFormData({
      title: '',
      subtitle: '',
      backgroundColor: '#FF6B6B',
      textColor: '#FFFFFF',
      buttonText: 'Shop Now',
      buttonLink: '/products/all',
      position: 'homepage-top',
      startDate: '',
      endDate: '',
      status: 'active',
      priority: 1
    });
  };

  const handleHideBannerForm = () => {
    setShowBannerForm(false);
    setEditingBanner(null);
  };

  const handleSubmitBanner = (e) => {
    e.preventDefault();
    if (editingBanner) {
      // Update existing banner
      setBanners(banners.map(b => b.id === editingBanner.id ? {...b, ...bannerFormData} : b));
      alert('✅ Banner updated successfully!');
    } else {
      // Create new banner
      const newBanner = {
        id: `banner${Date.now()}`,
        ...bannerFormData,
        impressions: 0,
        clicks: 0
      };
      setBanners([...banners, newBanner]);
      alert('✅ Banner created successfully!');
    }
    handleHideBannerForm();
  };

  const handleEditBanner = (bannerId) => {
    const banner = banners.find(b => b.id === bannerId);
    if (banner) {
      setEditingBanner(banner);
      setBannerFormData({
        title: banner.title,
        subtitle: banner.subtitle,
        backgroundColor: banner.backgroundColor,
        textColor: banner.textColor,
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        position: banner.position,
        startDate: banner.startDate,
        endDate: banner.endDate,
        status: banner.status,
        priority: banner.priority
      });
      setShowBannerForm(true);
    }
  };

  const handleDeleteBanner = (bannerId) => {
    if (window.confirm('Delete this banner?')) {
      setBanners(banners.filter(b => b.id !== bannerId));
      alert('🗑️ Banner deleted.');
    }
  };

  const handleToggleBannerStatus = (bannerId) => {
    setBanners(banners.map(b => {
      if (b.id === bannerId) {
        const newStatus = b.status === 'active' ? 'inactive' : 'active';
        return {...b, status: newStatus};
      }
      return b;
    }));
  };

  // Filter data based on active filters
  const filteredCustomers = accountFilter === 'all' ? customers : 
    accountFilter === 'active' ? customers.filter(c => c.status === 'active') :
    customers.filter(c => c.status === 'suspended');

  const filteredSellers = accountFilter === 'all' ? sellersList : 
    accountFilter === 'active' ? sellersList.filter(s => s.status === 'active') :
    sellersList.filter(s => s.status === 'suspended');

  const filteredFraud = fraudFilter === 'all' ? fraudList :
    fraudList.filter(f => f.status === fraudFilter);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <Header 
        cartCount={0} 
        onLoginClick={() => {}}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        onLogout={onLogout}
      />
      
      {/* Admin Dashboard Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>🛡️ Admin Dashboard</h1>
          <button className="back-home-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="admin-container">
        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-text">Dashboard</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'approvals' ? 'active' : ''}`}
            onClick={() => setActiveTab('approvals')}
          >
            <span className="tab-icon">✅</span>
            <span className="tab-text">Approvals</span>
            <span className="tab-badge">{sellers.length + products.length}</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'accounts' ? 'active' : ''}`}
            onClick={() => setActiveTab('accounts')}
          >
            <span className="tab-icon">👥</span>
            <span className="tab-text">Accounts</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'fraud' ? 'active' : ''}`}
            onClick={() => setActiveTab('fraud')}
          >
            <span className="tab-icon">⚠️</span>
            <span className="tab-text">Fraud Monitor</span>
            <span className="tab-badge fraud-badge">{fraudList.filter(f => f.status !== 'resolved').length}</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'banners' ? 'active' : ''}`}
            onClick={() => setActiveTab('banners')}
          >
            <span className="tab-icon">🎞️</span>
            <span className="tab-text">Banners</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="admin-content">
          {activeTab === 'dashboard' && <DashboardTab />}
          
          {activeTab === 'approvals' && (
            <ApprovalsTab
              sellers={sellers}
              products={products}
              onApproveSeller={handleApproveSeller}
              onRejectSeller={handleRejectSeller}
              onApproveProduct={handleApproveProduct}
              onRejectProduct={handleRejectProduct}
            />
          )}
          
          {activeTab === 'accounts' && (
            <AccountsTab
              customers={filteredCustomers}
              sellers={filteredSellers}
              accountFilter={accountFilter}
              onFilterChange={handleAccountFilterChange}
              onSuspendAccount={handleSuspendAccount}
              onActivateAccount={handleActivateAccount}
              onDeleteAccount={handleDeleteAccount}
            />
          )}
          
          {activeTab === 'fraud' && (
            <FraudMonitorTab
              fraudList={filteredFraud}
              fraudFilter={fraudFilter}
              onFilterChange={handleFraudFilterChange}
              onInvestigate={handleInvestigateFraud}
              onResolve={handleResolveFraud}
              onDismiss={handleDismissFraud}
            />
          )}
          
          {activeTab === 'banners' && (
            <BannersTab
              banners={banners}
              showBannerForm={showBannerForm}
              editingBanner={editingBanner}
              bannerFormData={bannerFormData}
              onFormDataChange={handleBannerFormDataChange}
              onShowForm={handleShowBannerForm}
              onHideForm={handleHideBannerForm}
              onSubmitBanner={handleSubmitBanner}
              onEditBanner={handleEditBanner}
              onDeleteBanner={handleDeleteBanner}
              onToggleStatus={handleToggleBannerStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
