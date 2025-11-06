import React, { useState, useEffect } from 'react';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [loginType, setLoginType] = useState('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    gstNumber: '',
    bankAccount: ''
  });

  // Reset modal state when it opens/closes
  useEffect(() => {
    if (!isOpen) {
      setMode('login');
      setLoginType('customer');
      setFormData({ email: '', password: '', name: '', phone: '', businessName: '', businessAddress: '', gstNumber: '', bankAccount: '' });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'login') {
      const username = formData.email.split('@')[0];
      const role = loginType; // Capture role before modal closes
      console.log('Login submitted - Role:', role, 'Username:', username); // Debug log
      alert(`Logged in successfully as ${role}!`);
      // Simulate successful login
      if (onLoginSuccess) {
        console.log('Calling onLoginSuccess with:', username, role); // Debug log
        onLoginSuccess(username, role); // Pass username and role
      }
      onClose();
    } else {
      if (loginType === 'seller') {
        alert(`Seller registration submitted for ${formData.businessName}!\n\nYour account is pending admin approval.`);
      } else {
        alert(`Account created successfully!\nYou can now login.`);
      }
      setMode('login');
      setFormData({ email: '', password: '', name: '', phone: '', businessName: '', businessAddress: '', gstNumber: '', bankAccount: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-btn ${loginType === 'customer' ? 'active' : ''}`}
            onClick={() => setLoginType('customer')}
          >
            👤 Customer
          </button>
          <button
            className={`tab-btn ${loginType === 'seller' ? 'active' : ''}`}
            onClick={() => setLoginType('seller')}
          >
            🏪 Seller
          </button>
          {mode === 'login' && (
            <button
              className={`tab-btn ${loginType === 'admin' ? 'active' : ''}`}
              onClick={() => setLoginType('admin')}
            >
              🛡️ Admin
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              {loginType === 'seller' ? (
                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required placeholder="Enter business name" />
                </div>
              ) : (
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter phone number" />
            </div>
          )}

          {mode === 'signup' && loginType === 'seller' && (
            <>
              <div className="form-group">
                <label>Business Address</label>
                <textarea name="businessAddress" value={formData.businessAddress} onChange={handleChange} required placeholder="Enter business address" rows="2" />
              </div>
              <div className="form-group">
                <label>GST Number</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required placeholder="Enter GST number" />
              </div>
              <div className="form-group">
                <label>Bank Account</label>
                <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} required placeholder="Enter bank account" />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" minLength="6" />
          </div>

          <button type="submit" className="submit-btn">
            {mode === 'login' ? 'Login' : (loginType === 'seller' ? 'Submit for Approval' : 'Create Account')}
          </button>

          <div className="modal-footer">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button type="button" className="link-btn" onClick={() => setMode('signup')}>
                  Sign up here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button type="button" className="link-btn" onClick={() => setMode('login')}>
                  Login here
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
