
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaLeaf, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive ? 'bg-[#2e7d32] text-white' : 'text-gray-700 hover:bg-green-100'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
      isActive ? 'bg-[#2e7d32] text-white' : 'text-gray-700 hover:bg-green-100'
    }`;

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-[#2e7d32] hover:opacity-80 transition-opacity">
              <FaLeaf className="h-8 w-8" />
              <span className="font-bold text-xl hidden sm:block">PlantCare</span>
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/all-plants" className={navLinkClass}>All Plants</NavLink>
                {isAuthenticated && (
                  <>
                    <NavLink to="/add-plant" className={navLinkClass}>Add Plant</NavLink>
                    <NavLink to="/my-plants" className={navLinkClass}>My Plants</NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated && user ? (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setProfileOpen(!isProfileOpen)}
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`} alt="" />
                    </button>
                  </div>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            <p className="font-medium">Signed in as</p>
                            <p className="truncate">{user.name}</p>
                        </div>
                        <a href="#" onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <FaSignOutAlt/> Logout
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <NavLink to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-[#2e7d32] bg-white border border-[#2e7d32] hover:bg-green-50 transition-colors">Login</NavLink>
                  <NavLink to="/register" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2e7d32] hover:bg-[#25632b] transition-colors">Register</NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/all-plants" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>All Plants</NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to="/add-plant" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Add Plant</NavLink>
                  <NavLink to="/my-plants" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>My Plants</NavLink>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center px-3">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.email}`} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-gray-800">{user?.name}</div>
                          <div className="text-sm font-medium leading-none text-gray-500">{user?.email}</div>
                        </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      <a href="#" onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="flex items-center gap-2 mt-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                          <FaSignOutAlt/> Logout
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4 px-2 space-y-2">
                   <NavLink to="/login" className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-[#2e7d32] bg-white border border-[#2e7d32] hover:bg-green-50 transition-colors">Login</NavLink>
                  <NavLink to="/register" className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2e7d32] hover:bg-[#25632b] transition-colors">Register</NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
