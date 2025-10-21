import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './usersidebar.css'; // Import your custom CSS file

const { Sider } = Layout;

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const location = useLocation();

  const selectedKey = location.pathname === '/userdashboard' ? '4'
    : location.pathname === '/HomePage' ? '1'
    : location.pathname === '/MyProfile' ? '2'
    : location.pathname === '/Photography.js' ? '3' : '5';

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      trigger={null}
      width={250} // Fixed width
      collapsedWidth="80" // Sidebar width when collapsed
      style={{ backgroundColor: '#D4451E', height: '100vh' }} // Ensure full height
    >
      <div className="logo text-center py-5 text-white text-xl font-bold">
        {!collapsed && <img src="/assets/lologo.png" alt="Logo" className="max-w-full" />}
      </div>
      <div onClick={toggleCollapse} className="text-center mb-5 cursor-pointer">
        {collapsed ? <MenuUnfoldOutlined className="text-white text-2xl" /> : <MenuFoldOutlined className="text-white text-2xl" />}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        theme="dark"
        style={{ backgroundColor: '#D4451E', height: 'calc(100vh - 80px)', overflow: 'auto' }} // Adjusted to prevent overflow
      >
        <Menu.Item key="1" icon={<HomeOutlined className="text-white" />}>
          <Link to="/HomePage" className="text-white hover:text-[#D4451E]">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProfileOutlined className="text-white" />}>
          <Link to="/MyProfile" className="text-white hover:text-[#D4451E]">My Profile</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined className="text-white" />}>
          <Link to="/Photography.js" className="text-white hover:text-[#D4451E]">Services</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileDoneOutlined className="text-white" />}>
          <Link to="/userdashboard/UserDashboard" className="text-white hover:text-[#D4451E]">My Orders</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined className="text-white" />}>
          <Link to="/logout" className="text-white hover:text-[#D4451E]">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default UserSidebar;
