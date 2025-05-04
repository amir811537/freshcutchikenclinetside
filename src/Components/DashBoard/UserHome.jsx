import { useContext } from "react";
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

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
  const recentOrders = orders.slice(0, 2); // Show latest 2

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {user?.displayName || user?.email}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl text-blue-600">{totalOrders}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl text-yellow-500">{pendingOrders}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Confirmed</h3>
          <p className="text-2xl text-green-600">{confirmedOrders}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <ul className="space-y-3">
            {recentOrders.map((order) => (
              <li key={order._id} className="border rounded p-3 shadow-sm bg-white">
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`font-semibold ${
                  order.status === 'pending' ? 'text-yellow-500' :
                  order.status === 'confirmed' ? 'text-green-600' : 'text-gray-500'
                }`}>{order.status}</span></p>
                <p><strong>Total:</strong> ৳{order.totalAmount}</p>
              </li>
            ))}
          </ul>
        )}
        <Link to="/dashboard/myOrders" className="text-blue-600 mt-2 inline-block">View All Orders →</Link>
      </div>
    </div>
  );
};

export default UserHome;
