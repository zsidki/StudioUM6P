import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [admins, setAdmins] = useState([]);

  // Fetch the list of admins from the backend
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('https://comm6-0-1.onrender.com/admins'); // Replace with your API endpoint
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
      alert('Could not fetch admins');
    }
  };

  // Delete an admin
  const deleteAdmin = async (adminId) => {
    try {
      await axios.delete(`https://comm6-0-1.onrender.com/admins/${adminId}`); // Replace with your API endpoint
      fetchAdmins(); // Refresh the admin list
      alert('Admin deleted successfully');
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Could not delete admin');
    }
  };

  // Promote a user to admin
  const promoteToAdmin = async (userId) => {
    try {
      await axios.patch(`https://comm6-0-1.onrender.comL/users/${userId}/promote`); // Replace with your API endpoint
      fetchAdmins(); // Refresh the admin list
      alert('User promoted to admin successfully');
    } catch (error) {
      console.error('Error promoting user to admin:', error);
      alert('Could not promote user to admin');
    }
  };

  // Demote an admin back to a user
  const demoteToUser = async (adminId) => {
    try {
      await axios.patch(`https://comm6-0-1.onrender.com/admins/${adminId}/demote`); // Replace with your API endpoint
      fetchAdmins(); // Refresh the admin list
      alert('Admin demoted to user successfully');
    } catch (error) {
      console.error('Error demoting admin:', error);
      alert('Could not demote admin');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Username</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="py-2 px-4 border-b border-gray-200">{admin.username}</td>
              <td className="py-2 px-4 border-b border-gray-200">{admin.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => deleteAdmin(admin.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded mr-2 hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => promoteToAdmin(admin.id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                >
                  Promote
                </button>
                <button
                  onClick={() => demoteToUser(admin.id)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Demote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
