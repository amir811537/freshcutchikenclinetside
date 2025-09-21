import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const OrderHistory = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: history = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orderHistory'],
    queryFn: async () => {
      const res = await axiosPublic.get(
        '/orderhistory'
      );
      return res.data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = history.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isError) return <p>Failed to load order history.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {history.length === 0 ? (
        <p>No delivered orders found in history.</p>
      ) : (
        <div className="space-y-6">
          {currentOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-black dark:text-white"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold">
                  Customer: {order.customer.name}
                </h3>
                <p>Email: {order.customer.email}</p>
                <p>Phone: {order.customer.phone}</p>
                <p>
                  Address: {order.customer.address}, {order.customer.apartment}
                </p>
                <p>Payment: {order.paymentMethod}</p>
                <p>
                  Order Date:{' '}
                  {new Date(order.orderDate).toLocaleString('en-BD')}
                </p>
              </div>

              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100 dark:bg-black dark:text-white">
                    <th className="border px-2 py-1">Product</th>
                    <th className="border px-2 py-1">Image</th>
                    <th className="border px-2 py-1">Price</th>
                    <th className="border px-2 py-1">Qty</th>
                    <th className="border px-2 py-1">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border px-2 py-1">{item.name}</td>
                      <td className="border px-2 py-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="border px-2 py-1">৳{item.price}</td>
                      <td className="border px-2 py-1">{item.quantity}</td>
                      <td className="border px-2 py-1">
                        ৳{item.quantity * parseFloat(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right font-bold mt-2">
                Total: ৳{order.totalAmount}
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
