import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerStorefront from './pages/SellerStorefront';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartWishlistPage from './pages/CartWishlistPage';
import ComparisonPage from './pages/ComparisonPage';
import './styles/App.css';

function App() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: 'User',
    userRole: 'customer'
  });

  const handleLoginSuccess = (name, role) => {
    console.log('App.js received - Name:', name, 'Role:', role); // Debug log
    setAuthState({
      isLoggedIn: true,
      userName: name,
      userRole: role
    });
  };

  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      userName: 'User',
      userRole: 'customer'
    });
    console.log('User logged out');
  };

  // Debug: Log state changes
  useEffect(() => {
    console.log('App.js STATE CHANGE - isLoggedIn:', authState.isLoggedIn, 'userName:', authState.userName, 'userRole:', authState.userRole);
  }, [authState]);

  const authProps = {
    isLoggedIn: authState.isLoggedIn,
    userName: authState.userName,
    userRole: authState.userRole,
    onLoginSuccess: handleLoginSuccess,
    onLogout: handleLogout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage {...authProps} />} />
        <Route path="/products/:category" element={<ProductsPage {...authProps} />} />
        <Route path="/admin" element={<AdminDashboard {...authProps} />} />
        <Route path="/seller" element={<SellerDashboard {...authProps} />} />
        <Route path="/shop/:sellerId" element={<SellerStorefront {...authProps} />} />
        <Route path="/product/:productId" element={<ProductDetailsPage {...authProps} />} />
        <Route path="/cart" element={<CartWishlistPage {...authProps} />} />
        <Route path="/compare" element={<ComparisonPage {...authProps} />} />
      </Routes>
    </Router>
  );
}

export default App;
