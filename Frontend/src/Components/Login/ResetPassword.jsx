// ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import land from '../Assets/land.jpg';
import axios from 'axios';

const ResetPassword = () => {
  const resetState = localStorage.getItem('resetState');

  if (resetState !== 'OTP_VERIFIED') {
    navigate('/forgot-password');  // Redirect to OTP verification page
  }
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length < minLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setPasswordError(
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    try {
      // Send reset password request to the backend
      const email = localStorage.getItem('email'); // Assuming email is stored after OTP verification
      await axios.post('http://localhost:8005/auth/reset-password', { email, newPassword });
      alert('Password reset successfully!');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error(error);
      alert('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <p>Please enter a new password for your account.</p>
        <form onSubmit={handleResetPassword}>
          <div className="input-group">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePassword(e.target.value); // Validate password on input change
              }}
              required
            />
            <span className="icon">🔒</span>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="icon">🔒</span>
          </div>
          {confirmPasswordError && (
            <p className="error-message">{confirmPasswordError}</p>
          )}
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
      </div>
      <div className="mockups">
        <img
          src={land}
          alt="Device mockups"
          className="mockups-img"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
