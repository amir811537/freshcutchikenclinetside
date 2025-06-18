/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import LoginRegister from "../pages/Auth/LoninRegister";
import useCart from "../../hooks/useCart";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sidebarRef = useRef();

  const toggleSidebar = () => setSidebar(!sidebar);
  const toggleModal = () => setShowModal(!showModal);

  const { logOut, user, role } = useContext(AuthContext);

  const { data: cartData = [] } = useCart(user?.email);

  // Logout Handler
  const handelsingout = () => {
    logOut()
      .then(() => {
        // console.log(result);
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
      if (
        sidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  return (
    <nav className="w-full bg-white dark:bg-black shadow-md fixed top-0 left-0 z-50">
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
              <img
                className="rounded-full lg:p-3 hidden lg:block p-0 lw-24 h-24"
                src="https://i.ibb.co.com/HT4zS4SM/logo-removebg-preview.png"
                alt="logo"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-lg">
            {["/", "/Products", "/Service", "/Contact"].map((path, idx) => (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#F5BC3B] underline font-semibold"
                    : "hover:text-[#F5BC3B]"
                }
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </NavLink>
            ))}
          </div>
          {/* text for only mobile nav */}
          <div className="lg:hidden block mr-9">
            <a href="/">
              <p className="font-extrabold text-red-700 text-2xl">Fresh Cut</p>
            </a>
          </div>
          {/* cart icon for mobile nav */}
          <div className="lg:hidden block">
            <div className="flex justify-start items-center gap-3">
              <div className="text-lg">
                <Link
                  to={
                    role === "admin"
                      ? "/dashboard/adminHome"
                      : role === "user"
                      ? "/dashboard/cart"
                      : "/dashboard"
                  }
                >
                  <div className="relative">
                    <div className="t-0 absolute left-3">
                      <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                        {cartData.length}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="file: h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Desktop Login/Logout Button */}

          <div className="hidden md:block">
            <div className="flex justify-center items-center gap-7">
              <div className="flex justify-start items-center gap-3">
                <div className="text-lg">
                  <Link
                    to={
                      role === "admin"
                        ? "/dashboard/adminHome"
                        : role === "user"
                        ? "/dashboard/cart"
                        : "/dashboard"
                    }
                  >
                    <div className="relative">
                      <div className="t-0 absolute left-3">
                        <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                          {cartData.length}{" "}
                        </p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="file: h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

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
      </div>
      {/* Mobile Sidebar */}
      <Sidebar
        sidebarRef={sidebarRef}
        sidebar={sidebar}
        toggleSidebar={toggleSidebar}
        role={role}
        cartData={cartData}
        user={user}
        handelsingout={handelsingout}
        toggleModal={toggleModal}
      />

      {/* Login/Sign Up Modal */}
      <LoginRegister showModal={showModal} setShowModal={setShowModal} />
    </nav>
  );
};

export default Navbar;
