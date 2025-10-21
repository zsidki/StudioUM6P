import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme'; // Your custom theme
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';
import GallerySlider from './GallerySlider';
import ContactUs from './ContactUs';
import AboutUsPage from './AboutUsPage';
import Photography from './Photography';
import WhatWeDo from './WhatWeDo';
import OurVission from './OurVission';
import BackgroundSection from './BackgroundSection';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Auth from './Auth';
import AboutUs from './AboutUs';
import Summary from './Summary';
import ServiceSelection from './ServiceSelection';
import PersonalData from './PersonalData';
import MyProfile from './MyProfile';
import AdminLayout from './layouts/admin'; // Admin Layout component
import UserLayout from './layouts/user'; // User Layout component

// User Context
import { useUser } from './context/UserContext';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div style={{ flex: '1' }}>{children}</div>
    <Footer />
  </>
);

const App = () => {
  const { role } = useUser(); // Access the role from context
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [isRoleLoaded, setIsRoleLoaded] = useState(false); // To check when the role is loaded

  useEffect(() => {
    // Ensure the role is loaded from context or localStorage.
    if (role !== undefined) {
      setIsRoleLoaded(true);
    }
  }, [role]);

  // Debug: Log the role to ensure it is set correctly
  console.log('Role:', role);  // <-- This will help you see if the role is correct

  if (!isRoleLoaded) {
    return <div>Loading...</div>; // A loading indicator while the role is determined
  }

  return (
    <ChakraProvider theme={currentTheme}> 
      <Router>
        <Routes>
          {/* Admin Routes */}
          {role === 'admin' || role === 'SUPER_ADMIN' ? (
            <>
              <Route path="/admin/*" element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
            </>
          ) : null}

          {/* User Routes */}
          {role === 'user' ? (
            <Route
              path="/user/*"
              element={<UserLayout theme={currentTheme} setTheme={setCurrentTheme} />}
            />
          ) : null}

          {/* Main Application Routes */}
          <Route path="/" element={<Navigate to="/HomePage" replace />} />
          <Route path="/HomePage" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/GallerySlider" element={<MainLayout><GallerySlider /></MainLayout>} />
          <Route path="/ContactUs" element={<MainLayout><ContactUs /></MainLayout>} />
          <Route path="/AboutUsPage" element={<MainLayout><AboutUsPage /></MainLayout>} />
          <Route path="/Photography" element={<MainLayout><Photography /></MainLayout>} />
          <Route path="/WhatWeDo" element={<MainLayout><WhatWeDo /></MainLayout>} />
          <Route path="/OurVission" element={<MainLayout><OurVission /></MainLayout>} />
          <Route path="/SignIn" element={<MainLayout><SignIn /></MainLayout>} />
          <Route path="/SignUp" element={<MainLayout><SignUp /></MainLayout>} />
          <Route path="/Auth" element={<MainLayout><Auth /></MainLayout>} />
          <Route path="/AboutUs" element={<MainLayout><AboutUs /></MainLayout>} />
          <Route path="/PersonalData" element={<MainLayout><PersonalData /></MainLayout>} />
          <Route path="/ServiceSelection" element={<MainLayout><ServiceSelection /></MainLayout>} />
          <Route path="/Summary" element={<MainLayout><Summary /></MainLayout>} />
          <Route path="/myprofile" element={<MainLayout><MyProfile /></MainLayout>} />

          {/* Fallback route for unknown paths */}
          <Route path="*" element={<Navigate to="/HomePage" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
