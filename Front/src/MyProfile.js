import React, { useState, useEffect } from 'react';
import { message } from 'antd'; // Ant Design for messages
import { FaEdit } from 'react-icons/fa'; // React Icons for edit icon

const MyProfile = ({ onImageUpdate }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    department: '',
    profileImage: '/assets/user-icon.png', // Default profile image
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false); // For image confirmation
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [newImage, setNewImage] = useState(null); // Store new image before confirmation

  useEffect(() => {
    // Fetch user from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);



  // Confirming image change and uploading to the backend
  const handleConfirmImage = async () => {
    const formData = new FormData();
    formData.append('file', newImage); // Append the file for upload

    try {
      const response = await fetch(`https://comm6-0-1.onrender.com/api/profile/uploadImage?userId=${user.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imagePath = await response.text();
        const updatedUser = { ...user, profileImage: imagePath };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
        onImageUpdate(imagePath); // Update the Navbar image
        message.success('Profile image updated successfully!');
      } else {
        message.error('Failed to upload image.');
      }
    } catch (error) {
      message.error('An error occurred while uploading the image.');
    }

    setIsImageModalVisible(false);
  };

  // Handling profile field edits
  const handleEditClick = (field) => {
    setEditField(field);
    setEditValue(user[field]);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    const updatedUser = { ...user, [editField]: editValue };

    // Handle password update separately
    if (editField === 'password') {
      if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        message.error('Passwords do not match.');
        return;
      }
      if (!passwordData.currentPassword) {
        message.error('Please enter your current password.');
        return;
      }
      updatedUser.password = passwordData.newPassword;
      message.success('Password updated successfully!');
    } else {
      message.success(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully!`);
    }

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist to localStorage
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValue(value); // Update field value on input change
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    
<div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded-lg" style={{ paddingTop: '114px' ,marginBottom: '114px' }}>

      <h2 className="text-2xl font-semibold mb-6 text-center text-black">Edit Profile</h2>



      <div className="space-y-4">
        {/* Username */}
        <div className="flex justify-between items-center py-4 w-full" style={{ borderBottom: '1px solid #ccc' }}>
          <div>
            <h3 className="text-lg font-medium">Full Name</h3>
            <p>{user.username}</p>
          </div>
          <button
            onClick={() => handleEditClick('username')}
            className="py-1 px-6 rounded-full border border-gray-400 text-black hover:bg-gray-200 transition-all"
          >
            Edit
          </button>
        </div>

        {/* Email */}
        <div className="flex justify-between items-center py-4 w-full" style={{ borderBottom: '1px solid #ccc' }}>
          <div>
            <h3 className="text-lg font-medium">Email</h3>
            <p>{user.email}</p>
          </div>
          <button
            onClick={() => handleEditClick('email')}
            className="py-1 px-6 rounded-full border border-gray-400 text-black hover:bg-gray-200 transition-all"
          >
            Edit
          </button>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center py-4 w-full" style={{ borderBottom: '1px solid #ccc' }}>
          <div>
            <h3 className="text-lg font-medium">Phone</h3>
            <p>{user.phone || 'Add your phone number'}</p>
          </div>
          <button
            onClick={() => handleEditClick('phone')}
            className="py-1 px-6 rounded-full border border-gray-400 text-black hover:bg-gray-200 transition-all"
          >
            {user.phone ? 'Edit' : 'Add'}
          </button>
        </div>

        {/* Department */}
        <div className="flex justify-between items-center py-4 w-full" style={{ borderBottom: '1px solid #ccc' }}>
          <div>
            <h3 className="text-lg font-medium">Department</h3>
            <p>{user.department || 'No department assigned'}</p>
          </div>
          <button
            onClick={() => handleEditClick('department')}
            className="py-1 px-6 rounded-full border border-gray-400 text-black hover:bg-gray-200 transition-all"
          >
            Edit
          </button>
        </div>

        {/* Password */}
        <div className="flex justify-between items-center py-4 w-full">
          <div>
            <h3 className="text-lg font-medium">Password</h3>
            <p>********</p>
          </div>
          <button
            onClick={() => handleEditClick('password')}
            className="py-1 px-6 rounded-full border border-gray-400 text-black hover:bg-gray-200 transition-all"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Image confirmation modal */}
      {isImageModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-medium mb-4">Are you sure you want to change your profile image?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsImageModalVisible(false)}
                className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImage}
                className="py-2 px-4 bg-custom-red text-white rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit fields modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-medium mb-4">Edit {editField.charAt(0).toUpperCase() + editField.slice(1)}</h3>
            {editField === 'password' ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ) : (
              <input
                type="text"
                name={editField}
                value={editValue}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleModalCancel}
                className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleModalOk}
                className="py-2 px-4 bg-custom-red text-white rounded-md hover:bg-red-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
