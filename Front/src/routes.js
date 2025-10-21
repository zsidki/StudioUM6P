import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdEvent,
  MdRequestPage,
  MdDashboard,
  MdLock,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import DataTables from 'views/admin/dataTables';
import AdminTables from 'views/admin/adminTables';
import Calendar from 'views/admin/calendar';
import Requests from 'views/admin/requests';
import HomePage from './HomePage'; // Updated path

const routes = [
  {
    name: 'Home',
    layout: null,
    path: '/HomePage',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <HomePage />,
  },
  {
    name: 'Statistics',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Calendar',
    layout: '/admin',
    path: '/calendar',
    icon: <Icon as={MdEvent} width="20px" height="20px" color="inherit" />,
    component: <Calendar />,
  },
  {
    name: 'Requests',
    layout: '/admin',
    path: '/requests',
    icon: <Icon as={MdRequestPage} width="20px" height="20px" color="inherit" />,
    component: <Requests />,
  },
  {
    name: 'Admin',
    layout: '/admin',
    path: '/admin-tables',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <AdminTables />,
  },
  {
    name: 'Users',
    layout: '/admin',
    path: '/data-tables',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <DataTables />,
  },
];

export default routes;
