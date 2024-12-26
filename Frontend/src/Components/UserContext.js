// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const UserContext = createContext();

// UserProvider component to provide user context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set the user state with the stored data
    }
  }, []);

  // Function to set user data after login or registration
  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context in other components
export const useUser = () => useContext(UserContext);

