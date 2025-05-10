import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import axiosSecure from "../../../../hooks/axiosSecure";

const MyOrder = () => {
  const { user } = useContext(AuthContext);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['userOrders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/order?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4 dark:text-gray-100">Loading orders...</p>;
  if (isError) return <p className="p-4 text-red-500 dark:text-red-400">Failed to load orders.</p>;

  return (
    <div className="p-4 space-y-6 min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        <button
          onClick={refetch}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Refresh Status
        </button>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800 dark:border-gray-700 space-y-4"
          >
            <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                    order.status === 'pending'
                      ? 'bg-yellow-500'
                      : order.status === 'confirmed'
                      ? 'bg-blue-500'
                      : order.status === 'shipping'
                      ? 'bg-purple-500'
                      : order.status === 'delivered'
                      ? 'bg-green-600'
                      : 'bg-gray-500'
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p><strong>Total:</strong> ৳{order.totalAmount}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
            </div>

            <div className="grid gap-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border p-3 rounded-md dark:border-gray-600"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price per kg: ৳{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrder;
