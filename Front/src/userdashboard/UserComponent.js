import React from 'react';
import Sidebar from './Sidebar'; // Import the sidebar component
import { Routes, Route } from 'react-router-dom';
import UserDashboard from './UserDashboard'; // Main admin dashboard component


const UserComponent = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
        <Routes>
          <Route path="UserDashboard" element={<UserDashboard />} />

          {/* Additional routes can be added here */}
        </Routes>
      </div>
    </div>
  );
};

export default UserComponent;
