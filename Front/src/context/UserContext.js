import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating the UserContext
const UserContext = createContext();

// UserProvider will provide the user's role across the app
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('user'); // Default role is 'user'

  useEffect(() => {
    // Retrieve role from localStorage if available
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);  // If role is found in localStorage, update the state
    }
  }, []);  // This runs only once when the component is mounted

  const changeRole = (newRole) => {
    if (['user', 'admin', 'SUPER_ADMIN'].includes(newRole)) {
      setRole(newRole);
      localStorage.setItem('role', newRole); // Save the role to localStorage for persistence
    } else {
      console.error('Invalid role');
    }
  };

  return (
    <UserContext.Provider value={{ role, setRole: changeRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user role
export const useUser = () => useContext(UserContext);
