import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import axiosSecure from "../../../../hooks/axiosSecure";
import Loader from "../../../Loader/Loader";

const MyOrder = () => {
  const { user } = useContext(AuthContext);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/order?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader />
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Loading orders...
        </p>
      </div>
    );

  if (isError)
    return (
      <p className="p-4 text-center text-red-500 dark:text-red-400">
        Failed to load orders.
      </p>
    );

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const statusMap = {
              pending: 0,
              confirmed: 1,
              shipping: 2,
              delivered: 3,
            };
            const currentStep = statusMap[order.status] ?? 0;

            const steps = ["Pending", "Confirmed", "Shipping", "Delivered"];

            return (
              <div
                key={order._id}
                className="border rounded-xl p-6 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 space-y-6"
              >
                {/* Order info */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                  <p>
                    <span className="font-medium">Order Date:</span>{" "}
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`ml-1 px-2 py-1 rounded text-white text-xs font-medium ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "confirmed"
                          ? "bg-blue-500"
                          : order.status === "shipping"
                          ? "bg-purple-500"
                          : order.status === "delivered"
                          ? "bg-green-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Total:</span> ৳
                    {order.totalAmount}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    {order.paymentMethod}
                  </p>
                </div>

                {/* Tracking timeline */}
                <div className="flex items-center justify-between relative">
                  {steps.map((step, i) => (
                    <div
                      key={step}
                      className="flex-1 flex flex-col items-center relative"
                    >
                      {/* Connector line */}
                      {i < steps.length - 1 && (
                        <div
                          className={`absolute top-5 left-1/2 w-full h-1 -translate-x-1/2 ${
                            i < currentStep ? "bg-green-500" : "bg-gray-300"
                          }`}
                          style={{ zIndex: 0 }}
                        ></div>
                      )}

                      {/* Step circle */}
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 text-sm font-medium
                          ${
                            i <= currentStep
                              ? "bg-green-500 border-green-500 text-white"
                              : "bg-gray-200 border-gray-300 text-gray-500"
                          }`}
                      >
                        {i <= currentStep ? "✔" : i + 1}
                      </div>

                      {/* Label */}
                      <p
                        className={`mt-2 text-xs font-medium ${
                          i <= currentStep
                            ? "text-green-600"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Items */}
                <div className="grid gap-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-md"
                      />
                      <div className="text-sm">
                        <p className="font-semibold">{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Price per kg: ৳{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
