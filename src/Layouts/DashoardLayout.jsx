import {
  FaHome,
  FaShoppingCart,
  FaList,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { SiCraftcms } from "react-icons/si";
import { FcViewDetails } from "react-icons/fc";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logOut, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const activeLink =
    "flex items-center gap-2 font-semibold text-white bg-orange-600 px-3 py-2 rounded";
  const normalLink =
    "flex items-center gap-2 text-white px-3 py-2 hover:bg-orange-500 rounded";

  return (
    <div className="flex min-h-screen relative">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-orange-400 w-64 h-screen flex flex-col justify-between fixed md:relative z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold text-white p-4">Dashboard</h2>

          {/* Scrollable menu area */}
          <div className="overflow-y-auto flex-1 px-4">
            <ul className="menu space-y-2">
              {role === "admin" ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/adminHome"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaHome /> Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageOrders"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaList /> Manage Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addProduct"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <IoMdAddCircle /> Add Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/allProduct"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaList /> All Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageUser"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaUser /> User Management
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/order-history"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaHistory /> Delivered Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/cms"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <SiCraftcms /> CMS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/cmsDetails"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FcViewDetails /> CMS Details
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/userHome"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaHome /> User Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/cart"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaShoppingCart /> My Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myOrders"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FaList /> My Orders
                    </NavLink>
                  </li>
                </>
              )}
              <div className="divider my-2" />
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Sign out button */}
          <div className="p-4">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top bar for mobile */}
        <div className="md:hidden bg-orange-300 p-2 shadow flex justify-between items-center z-20 relative">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white text-xl"
          >
            <FaBars />
          </button>
          <h2 className="text-white font-bold text-lg">Dashboard</h2>
        </div>

        {/* Main page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
