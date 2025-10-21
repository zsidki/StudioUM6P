import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdPerson, MdHome, MdRequestPage, MdShoppingCart, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Admin Imports
import UserTables from 'views/user/userTables';
import HomePage from './HomePage';
import Profile from 'views/user/profile';
import Photography from './Photography';
import MyProfile from './MyProfile'; // Importing the My Profile component

const handleLogout = (navigate) => {
  console.log("Logging out...");
  // Clear user session or token
  localStorage.removeItem("authToken"); // If you're using localStorage for auth token
  // Redirect to HomePage after logging out
  navigate("/HomePage");
};

const userRoutes = [
  {
    name: 'Home',
    layout: null,
    path: '/HomePage',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <HomePage />,
  },

  {
    name: 'My Requests',
    layout: '/user',
    path: '/userTables',
    icon: <Icon as={MdRequestPage} width="20px" height="20px" color="inherit" />,
    component: <UserTables />,
  },
  {
    name: 'Our Partners',
    layout: '/user',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },


];

export default userRoutes;
