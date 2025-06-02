import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosSecure from "../../hooks/axiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);

  const { data: orders = [] } = useQuery({
    queryKey: ['userOrdersSummary', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/order?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
  const shippingOrders = orders.filter(order => order.status === 'shipping').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const recentOrders = orders.slice(0, 2); // Show latest 2

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold">Welcome, {user?.displayName || user?.email}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl text-blue-600 dark:text-blue-400">{totalOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl text-yellow-500">{pendingOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Confirmed</h3>
          <p className="text-2xl text-blue-500">{confirmedOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Shipping</h3>
          <p className="text-2xl text-purple-500">{shippingOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Delivered</h3>
          <p className="text-2xl text-green-600">{deliveredOrders}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <ul className="space-y-3">
            {recentOrders.map((order) => (
              <li key={order._id} className="border dark:border-gray-700 rounded p-3 shadow-sm bg-white dark:bg-gray-800">
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>
                  <strong>Status:</strong>
                  <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                    order.status === 'pending'
                      ? 'bg-yellow-500'
                      : order.status === 'confirmed'
                      ? 'bg-blue-500'
                      : order.status === 'shipping'
                      ? 'bg-purple-500'
                      : order.status === 'delivered'
                      ? 'bg-green-600'
                      : 'bg-gray-500'
                  }`}>
                    {order.status}
                  </span>
                </p>
                <p><strong>Total:</strong> ৳{order.totalAmount}</p>
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/dashboard/myOrders"
          className="text-blue-600 dark:text-blue-400 mt-2 inline-block"
        >
          View All Orders →
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
