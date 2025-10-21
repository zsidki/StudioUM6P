import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog, faShoppingCart, faUserCircle, faChartBar, faUserShield, faUsers, faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useUser } from './context/UserContext'
const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useUser();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setLoggedIn(true);
      setUser(storedUser);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
    setShowSignUpModal(false);
  };

  const openSignUpModal = () => {
    setShowSignInModal(false);
    setShowSignUpModal(true);
  };

  const handleSignIn = (userInfo) => {
    setLoggedIn(true);
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
    closeModal();
    if (redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null);
    } else {
      navigate(location.pathname);
    }
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    setShowDropdown(false);  // Fermer le dropdown après la déconnexion
    navigate('/');
  };


  const closeModal = () => {
    setShowSignInModal(false);
    setShowSignUpModal(false);
  };


  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBookNowClick = () => {
    if (!loggedIn) {
      setRedirectPath('/photography');
      openSignInModal();
    } else {
      navigate(`/photography?id=${user.id}`);
    }
  };

  const handlePortfolioClick = () => {
    navigate('/galleryslider');
  };

  const isRedThemePage = location.pathname === '/photography' || location.pathname === '/about' || location.pathname === '/myprofile';
  const navbarBgClass = isRedThemePage || scrolled ? 'bg-custom-red shadow-lg' : 'bg-transparent';

  return (
    <nav className={`fixed w-full z-20 transition-all duration-300 ${navbarBgClass} py-4`} style={{ height: '80px' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* Logo before scrolling */}
              {!scrolled && (
                <img
                  src={'/assets/Logo Studio6.0 cobrand UM6P color whit2.svg'}
                  alt="Logo"
                  className={`transition-all duration-300 mr-2 ${scrolled ? 'opacity-50' : 'opacity-100'}`}
                  style={{ height: '40px', width: 'auto' }}
                />
              )}

              {/* Logo after scrolling */}
              {scrolled && (
                <img
                  src={'/assets/Logo Studio6.0 cobrand UM6P White.svg'} // Change to your new logo for after scrolling
                  alt="Logo"
                  className="transition-all duration-300 mr-2"
                  style={{ height: '40px', width: 'auto' }}
                />
              )}
            </Link>
          </div>
          {/* Remaining Navbar Items */}
          <div className="hidden md:flex items-center flex-grow justify-center space-x-6">
            <button
              onClick={() => handleScrollToSection('about-section')}
              className="py-2 px-4 text-white text-center no-underline hover:text-gray-300 transition-all"
            >
              About Us
            </button>
            <button
              onClick={handlePortfolioClick}
              className="py-2 px-4 text-white text-center no-underline hover:text-gray-300 transition-all"
            >
              Portfolio
            </button>
            <button
              onClick={() => handleScrollToSection('contact-section')}
              className="py-2 px-4 text-white text-center no-underline hover:text-gray-300 transition-all"
            >
              Contact Us
            </button>
            <button
              onClick={handleBookNowClick}
              className="py-2 px-6 bg-transparent border-2 border-white text-white flex items-center hover:bg-white hover:text-custom-red transition-all"
              style={{ height: '48px' }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Book Now
            </button>
          </div>

          <div className="hidden md:flex items-center">
            {loggedIn ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={handleDropdownToggle}
                  className="py-2 px-6 bg-transparent border-2 border-white rounded-full text-white flex items-center hover:bg-white hover:text-custom-red transition-all"
                  style={{ height: '48px' }}
                >
                  <img
                    src={user.profileImage || '/assets/user-icon.png'} // Default profile picture
                    alt="User Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-semibold mr-2">
                    {user && user.username ? user.username : 'Username'}
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-2">
                      {/* Conditional menu items based on role */}
                      {role === 'user' && (
                        <>
                          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                            <Link to="/myprofile">My Profile</Link>
                          </li>
                          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            <Link to="/user/userTables">My Requests</Link>
                          </li>
                        </>
                      )}

                      {(role === 'admin' || role === 'SUPER_ADMIN') && (
                        <>
                          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                            <Link to="/admin/statistics">Statistics</Link>
                          </li>
                          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                            <Link to="/admin/calendar">Calendar</Link>
                          </li>
                          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faCog} className="mr-2" />
                            <Link to="/admin/requests">Requests</Link>
                          </li>
                          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faUsers} className="mr-2" />
                            <Link to="/admin/userTable">User Table</Link>
                          </li>
                          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                            <Link to="/admin/adminTable">Admin Table</Link>
                          </li>
                        </>
                      )}

                      {/* Common Logout option */}
                      <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        <button onClick={handleSignOut} className="w-full text-left">Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={openSignInModal}>
                <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-white" />
              </button>

            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <button onClick={() => handleScrollToSection('about-section')} className="block py-2 px-4 text-sm text-white">About Us</button>
        <button onClick={handlePortfolioClick} className="block py-2 px-4 text-sm text-white">Portfolio</button>
        <button onClick={() => handleScrollToSection('contact-section')} className="block py-2 px-4 text-sm text-white">Contact Us</button>
        <button onClick={handleBookNowClick} className="block py-2 px-4 text-sm text-white">Book Now</button>
        <button onClick={openSignInModal} className="block py-2 px-4 text-sm text-white">Sign In</button>
      </div>

      {showSignInModal && <SignIn closeModal={closeModal} openSignUpModal={openSignUpModal} handleSignIn={handleSignIn} />}
      {showSignUpModal && <SignUp closeModal={closeModal} openSignInModal={openSignInModal} />}
    </nav>
  );
};

export default Navbar;
