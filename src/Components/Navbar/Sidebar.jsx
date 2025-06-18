/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  sidebarRef,
  sidebar,
  toggleSidebar,
  role,
  cartData,
  user,
  handelsingout,
  toggleModal,
}) => {
  const handleLogout = () => {
    toggleSidebar();
    handelsingout();
  };

  const handleLogin = () => {
    toggleSidebar();
    toggleModal();
  };

  // Base nav links
  const baseLinks = [
    { path: "/", label: "Home" },
    { path: "/Products", label: "Products" },
    { path: "/service", label: "Service" },
    { path: "/contact", label: "Contact" },
  ];

  // Dynamically inject "My Cart" after "Products" if user role is 'user'
  const navLinks =
    role === "user"
      ? [
          ...baseLinks.slice(0, 2),
          { path: "/dashboard/cart", label: `My Cart (${cartData.length})` },
          ...baseLinks.slice(2),
        ]
      : baseLinks;

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        sidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button onClick={toggleSidebar} className="absolute top-4 right-4">
        <FaTimes size={20} />
      </button>

      {/* Sidebar Content Wrapper */}
      <div className="h-full flex flex-col justify-between pt-12 pb-6 px-4 text-center text-lg">
        {/* Top Navigation */}
        <div className="space-y-6">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-all ${
                  isActive
                    ? "text-black bg-[#f5bc3b] font-semibold"
                    : "hover:text-[#F5BC3B]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Bottom Auth Buttons */}
        <div className="w-full">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full py-2 btn bg-red-500 text-white hover:text-red-200"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full py-2 btn bg-green-500 text-white hover:text-[#F5BC3B]"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
