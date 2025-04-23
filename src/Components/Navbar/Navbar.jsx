import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo-removebg-preview.png';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => setSidebar(!sidebar);

  // Close sidebar if clicked outside
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
          {/* Sidebar Toggle Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleSidebar}>
              {sidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Right Logo */}
          <div className="text-2xl font-bold">
            <img className='rounded-full p-3 w-24 h-24' src={logo} alt="logo" />
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <Link to="/services" className="hover:text-blue-600">Services</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </div>

          {/* Left Login Button */}
          <div className="hidden md:block">
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </Link>
          </div>
        </div>
      </div>

   {/* Sidebar for Mobile */}
<div
  ref={sidebarRef}
  className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}
>
  {/* Close Button */}
  <button onClick={toggleSidebar} className="absolute top-4 right-4">
    <FaTimes size={20} />
  </button>

  {/* Sidebar Links */}
  <div className="p-4 pt-12 space-y-6 text-lg">
    <Link to="/" onClick={toggleSidebar} className="block hover:text-blue-600">Home</Link>
    <Link to="/products" onClick={toggleSidebar} className="block hover:text-blue-600">Products</Link>
    <Link to="/services" onClick={toggleSidebar} className="block hover:text-blue-600">Services</Link>
    <Link to="/contact" onClick={toggleSidebar} className="block hover:text-blue-600">Contact</Link>
    <Link to="/login" onClick={toggleSidebar} className="block hover:text-blue-600">Login</Link>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
