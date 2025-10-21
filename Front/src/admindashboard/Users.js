import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, message, Typography, Space, Popconfirm } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Title } = Typography;
const { Item } = Form;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Assume logged-in user role is fetched from an API or stored in the state
  const loggedInUserRole = 'super_admin'; // Change based on logged-in user's actual role

  const customRed = '#D4451E'; // Custom red color for theme

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://comm6-0-1.onrender.com/api/users');
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
        setFilteredUsers(data); // Initialize filteredUsers
      } else {
        message.error('Unexpected response format');
      }
    } catch (error) {
      message.error('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setNewUser(false); // Disable new user mode when editing
    form.setFieldsValue(user); // Populate the form with the user's data
  };

  const handleSaveEdit = async (userId) => {
    setLoading(true);
    try {
      const values = form.getFieldsValue();
      const method = newUser ? 'POST' : 'PUT';
      const url = newUser
        ? 'https://comm6-0-1.onrender.com/api/users'
        : `https://comm6-0-1.onrender.com/api/users/${userId}`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to save user');
      }

      const updatedUser = await response.json();

      setUsers((prevUsers) =>
        newUser
          ? [...prevUsers, updatedUser]
          : prevUsers.map((user) => (user.id === userId ? { ...user, ...values } : user))
      );
      setFilteredUsers((prevUsers) =>
        newUser
          ? [...prevUsers, updatedUser]
          : prevUsers.map((user) => (user.id === userId ? { ...user, ...values } : user))
      );
      setEditingUserId(null);
      setNewUser(false);
      message.success(newUser ? 'User added successfully' : 'User updated successfully');
    } catch (error) {
      message.error('Error saving user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewUser(false); // Reset new user mode
    form.resetFields(); // Clear form
  };

  const handleAddUser = () => {
    if (!newUser) {
      setNewUser(true); // Enable new user mode
      form.resetFields(); // Clear form for new user input
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://comm6-0-1.onrender.com/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      message.success('User deleted successfully');
    } catch (error) {
      message.error('Error deleting user');
    } finally {


      
      setLoading(false);
    }
  };

  // Promote a user to admin
  const promoteToAdmin = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://comm6-0-1.onrender.com/api/users/promote/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to promote user');
      }

      fetchUsers(); // Reload the users
      message.success('User promoted to admin');
    } catch (error) {
      message.error('Error promoting user');
    } finally {
      setLoading(false);
    }
  };

  // Revert an admin to a regular user
  const revertToUser = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://comm6-0-1.onrender.com/api/users/revert/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to revert admin');
      }

      fetchUsers(); // Reload the users
      message.success('Admin reverted to user');
    } catch (error) {
      message.error('Error reverting admin');
    } finally {
      setLoading(false);
    }
  };

  // Search functionality for username, email, phone, and department
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterUsers(e.target.value);
  };

  // Filter users based on search term by username, email, phone, and department
  const filterUsers = (searchTerm) => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      render: (text, user) =>
        editingUserId === user.id || newUser ? (
          <Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
            <Input placeholder="Enter username" />
          </Item>
        ) : (
          text
        ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (text, user) =>
        editingUserId === user.id || newUser ? (
          <Item name="email" rules={[{ required: true, type: 'email', message: 'Valid email is required' }]}>
            <Input placeholder="Enter email" />
          </Item>
        ) : (
          text
        ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      align: 'center',
      render: (text, user) =>
        editingUserId === user.id || newUser ? (
          <Item name="department" rules={[{ required: true, message: 'Department is required' }]}>
            <Input placeholder="Enter department" />
          </Item>
        ) : (
          text
        ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      render: (text, user) =>
        editingUserId === user.id || newUser ? (
          <Item name="phone" rules={[{ required: true, message: 'Phone number is required' }]}>
            <Input placeholder="Enter phone" />
          </Item>
        ) : (
          text
        ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (role) => role.charAt(0).toUpperCase() + role.slice(1), // Capitalize first letter
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, user) => (
        <>
          {editingUserId === user.id || newUser ? (
            <Space>
              <Button
                type="primary"
                onClick={() => handleSaveEdit(user.id)}
                icon={<SaveOutlined />}
                style={{ backgroundColor: customRed, borderColor: customRed }}
              >
                Save
              </Button>
              <Button onClick={handleCancelEdit} icon={<CloseOutlined />} danger>
                Cancel
              </Button>
            </Space>
          ) : (
            <Space>
              <Button
                type="primary"
                onClick={() => handleEditClick(user)}
                icon={<EditOutlined />}
                style={{ backgroundColor: customRed, borderColor: customRed }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => handleDeleteUser(user.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>
              
              {/* Only Super Admin can promote or revert roles */}
              {loggedInUserRole === 'super_admin' && (
                user.role === 'admin' ? (
                  <Popconfirm
                    title="Revert admin to user?"
                    onConfirm={() => revertToUser(user.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<EyeInvisibleOutlined />} type="default">
                      Revert to User
                    </Button>
                  </Popconfirm>
                ) : (
                  <Popconfirm
                    title="Promote to admin?"
                    onConfirm={() => promoteToAdmin(user.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<EyeTwoTone />} type="default">
                      Promote to Admin
                    </Button>
                  </Popconfirm>
                )
              )}
            </Space>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>User Management</Title>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by username, email, phone, or department"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          type="primary"
          onClick={handleAddUser}
          icon={<PlusOutlined />}
          style={{ backgroundColor: customRed, borderColor: customRed }}
        >
          Add User
        </Button>
      </Space>
      <Form form={form} layout="vertical">
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey={(user) => user.id}
          loading={loading}
          pagination={{
            pageSize: 5,
            showTotal: (total) => `Total ${total} users`,
          }}
        />
      </Form>
    </div>
  );
};

export default Users;
