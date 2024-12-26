import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext'; // Import useUser hook
import './Profile.css';

const Profile = () => {
  const { user, setUserData } = useUser(); // Access user context data and setUserData function
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Redirect to login if no user is found
  useEffect(() => {
    if (!setUserData) {
      window.location.href = '/'; // Redirect to login page if no user data
    } else {
      // Initialize form fields when user data is loaded
      setUserId(user?.id || '');
      setFullName(user?.fullName || '');
      setEmail(user?.email || '');
      setAddress(user?.address || '');
      setPhone(user?.phone || '');
    }
  }, [user]); // Only run when `user` context changes

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!userId) {
      setErrorMessage('User ID is required');
      return;
    }

    if (!fullName || !address || !phone) {
      setErrorMessage('Full Name, Address, and Phone are required');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8005/auth/update-profile', {
        id: userId,
        fullName,
        email,
        address,
        phone,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setSuccessMessage('Profile updated successfully!');
        const updatedUser = { userId, fullName, email, address, phone };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
      } else {
        setErrorMessage('Error updating profile.');
      }
    } catch (error) {
      setErrorMessage('Error updating profile. Please try again later.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.href = '/portfolio';
  };

  return (
    <div>
      {isModalOpen && (
        <div className="profile-modal">
          <div className="modal-content">
            <h2>User Profile</h2>

            {/* Display User ID */}
            <div className="user-id">
              <p>User Profile Id: {userId}</p>
            </div>
            {/* Display Email ID */}
            <div className="user-id">
              <p>User Email Id: {email}</p>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={!isEditable}
                />
              </div>



              <div className="input-group">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditable}
                />
              </div>

              <div className="input-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditable}
                />
              </div>

              <button type="submit" className="update-button" disabled={!isEditable}>
                Update
              </button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="modal-footer">
              <button className="close-button" onClick={handleCloseModal}>Close</button>
              <button className="edit-button" onClick={() => setIsEditable(true)}>
                <span role="img" aria-label="edit">✏️</span> Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
