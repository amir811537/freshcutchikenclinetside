/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo-removebg-preview.png';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => setSidebar(!sidebar);
  const toggleModal = () => setShowModal(!showModal);
  const switchAuthMode = () => setIsSignUp(!isSignUp);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebar]);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Sidebar Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleSidebar}>
              {sidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Logo */}
          <a href="/">
            <div className="text-2xl flex justify-center items-center font-bold">
              <img className="rounded-full lg:p-3 p-0 w-24 h-24" src={logo} alt="logo" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 underline font-semibold" : "hover:text-blue-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allProducts"
              className={({ isActive }) =>
                isActive ? "text-blue-600 underline font-semibold" : "hover:text-blue-600"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "text-blue-600 underline font-semibold" : "hover:text-blue-600"
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-600 underline font-semibold" : "hover:text-blue-600"
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <button onClick={toggleModal} className="bg-[#F5BC3B] text-white px-4 py-2 rounded hover:bg-orange-500">
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button onClick={toggleSidebar} className="absolute top-4 right-4">
          <FaTimes size={20} />
        </button>
        <div className="p-4 pt-12 space-y-6 text-lg">
          <NavLink
            to="/"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 underline font-semibold" : "block hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/allProducts"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 underline font-semibold" : "block hover:text-blue-600"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/services"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 underline font-semibold" : "block hover:text-blue-600"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "block text-blue-600 underline font-semibold" : "block hover:text-blue-600"
            }
          >
            Contact
          </NavLink>
          <button onClick={() => { toggleSidebar(); toggleModal(); }} className="block hover:text-blue-600">
            Login
          </button>
        </div>
      </div>

      {/* Login/Sign Up Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {isSignUp ? 'Create Account' : 'Login'}
            </h2>

            <form>
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 mb-4 border rounded"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 mb-4 border rounded"
                />
              )}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </form>

            <div className="text-sm mt-4 text-center">
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button onClick={switchAuthMode} className="text-blue-600 hover:underline">
                    Login
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button onClick={switchAuthMode} className="text-blue-600 hover:underline">
                    Sign Up
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
