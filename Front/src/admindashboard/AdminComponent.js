import React from 'react';
import AdminSidebar from './AdminSidebar'; // Import the sidebar component
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard'; // Main admin dashboard component
import AdminStats from './AdminStats'; // Admin statistics component
import RequestsPage from './RequestsPage'; // Requests component
import Users from './Users'; // Users management component
import ContactUsResponse from './ContactUsResponse'; // Contact responses
import Admin from './Admin'; // Contact responses

const AdminComponent = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left */}
      <AdminSidebar />

      {/* Main content area */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="AdminStats" element={<AdminStats />} />
          <Route path="RequestsPage" element={<RequestsPage />} />
          <Route path="users" element={<Users />} />
          <Route path="contact-response" element={<ContactUsResponse />} />
          <Route path="admin" element={<Admin />} />

          {/* Additional routes can be added here */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminComponent;
