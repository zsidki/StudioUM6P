import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import your custom CSS file

const { Sider } = Layout;

// Custom styles for the sidebar
const sidebarStyles = {
  backgroundColor: '#D4451E', // Custom red
  height: '100vh', // Full height
};

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      trigger={null}
      width={250} // Fixed width
      collapsedWidth="80" // Sidebar width when collapsed
      style={sidebarStyles}
    >
      {/* Logo */}
      <div className="logo text-center py-5 text-white text-xl font-bold">
        {!collapsed && <img src="/assets/lologo.png" alt="Logo" className="max-w-full" />}
      </div>

      {/* Collapse/Expand button */}
      <div onClick={toggleCollapse} className="text-center mb-5 cursor-pointer">
        {collapsed ? (
          <MenuUnfoldOutlined className="text-white text-2xl" />
        ) : (
          <MenuFoldOutlined className="text-white text-2xl" />
        )}
      </div>

      {/* Sidebar Menu Items */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        theme="dark"
        style={sidebarStyles}
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/Admindashboard/RequestsPage" className="text-[#D4451E]">Requests</Link>
        </Menu.Item>

        <Menu.Item
          key="2"
          icon={<ProfileOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/MyProfile" className="text-white hover:text-[#D4451E]">My Profile</Link>
        </Menu.Item>

        <Menu.Item
          key="3"
          icon={<ShoppingCartOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/Admindashboard/Adminstats" className="text-white hover:text-[#D4451E]">Statistics</Link>
        </Menu.Item>

        <Menu.Item
          key="4"
          icon={<FileDoneOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/Admindashboard/Calendar" className="text-white hover:text-[#D4451E]">My Calendar</Link>
        </Menu.Item>

        <Menu.Item
          key="5"
          icon={<UserOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/Admindashboard/Users" className="text-white hover:text-[#D4451E]">Manage Users</Link>
        </Menu.Item>

        {/* New Admin Item */}
        <Menu.Item
          key="6"
          icon={<SettingOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/Admindashboard/admin" className="text-white hover:text-[#D4451E]">Admin</Link>
        </Menu.Item>

        <Menu.Item
          key="7"
          icon={<SettingOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/Admindashboard/admin" className="text-white hover:text-[#D4451E]">Settings</Link>
        </Menu.Item>

        <Menu.Item
          key="8"
          icon={<LogoutOutlined className="text-white" />}
          className="hover:bg-white hover:text-[#D4451E] text-white"
        >
          <Link to="/Admindashboard/Logout" className="text-white hover:text-[#D4451E]">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default UserSidebar;
