/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const sidebarRef = useRef();

  const toggleSidebar = () => setSidebar(!sidebar);
  const toggleModal = () => setShowModal(!showModal);
  const switchAuthMode = () => setIsSignUp(!isSignUp);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const { signuprg, createUser, googleSignin, logOut, user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Register Handler
  const handelRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log('Registered:', result);
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 3000,
        });
        setShowModal(false);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  // Login Handler
  const handelLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    signuprg(email, password)
      .then((result) => {
        console.log('Logged in:', result);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 3000,
        });
        setShowModal(false);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Email or password incorrect",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  // Google login
  const handelGoogle = () => {
    googleSignin()
      .then((result) => {
        console.log('Google login:', result);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 3000,
        });
        setShowModal(false);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Google login failed",
          text: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  // Logout Handler
  const handelsingout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Sign out successful",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              <img className="rounded-full lg:p-3 p-0 w-24 h-24" src="https://i.ibb.co.com/HT4zS4SM/logo-removebg-preview.png" alt="logo" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-lg">
            {['/', '/Products', '/Service', '/Contact'].map((path, idx) => (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-[#F5BC3B] underline font-semibold" : "hover:text-[#F5BC3B]"
                }
              >
                {path === '/' ? 'Home' : path.replace('/', '')}
              </NavLink>
            ))}
          </div>

          {/* Desktop Login/Logout Button */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handelsingout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={toggleModal}
                className="bg-[#F5BC3B] text-white px-4 py-2 rounded hover:bg-orange-500"
              >
                Login
              </button>
            )}
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
          {['/', '/allProducts', '/service', '/contact'].map((path, idx) => (
            <NavLink
              key={idx}
              to={path}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? "block text-[#F5BC3B] underline font-semibold" : "block hover:text-[#F5BC3B]"
              }
            >
              {path === '/' ? 'Home' : path.replace('/', '')}
            </NavLink>
          ))}
          {user ? (
            <button onClick={() => { toggleSidebar(); handelsingout(); }} className="block hover:text-red-500">
              Sign Out
            </button>
          ) : (
            <button onClick={() => { toggleSidebar(); toggleModal(); }} className="block hover:text-[#F5BC3B]">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Login/Sign Up Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              {isSignUp ? 'Create Account' : 'Login'}
            </h2>

            <form onSubmit={isSignUp ? handelRegister : handelLogin}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-2 mb-4 border rounded"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
              />

              {/* Password Field */}
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password Field */}
              {isSignUp && (
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </form>

            <button
              onClick={handelGoogle}
              className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600"
            >
              Sign in with Google
            </button>

            <div className="text-sm mt-4 text-center">
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button onClick={switchAuthMode} className="text-[#F5BC3B] hover:underline">
                    Login
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button onClick={switchAuthMode} className="text-[#F5BC3B] hover:underline">
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
