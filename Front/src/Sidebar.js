// components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl mb-6">Admin Dashboard</h2>
      <ul>
        <li><Link to="/" className="block py-2 hover:bg-gray-700">Dashboard</Link></li>
        <li><Link to="/users" className="block py-2 hover:bg-gray-700">Users</Link></li>
        <li><Link to="/settings" className="block py-2 hover:bg-gray-700">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
