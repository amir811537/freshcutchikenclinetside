import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';

const ManageOrder = () => {
  const [selectedStatuses, setSelectedStatuses] = useState([
    'pending',
    'confirmed',
    'shipping',
    'delivered',
  ]);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axios.get('https://freshcutserverside.vercel.app/order');
      return res.data;
    },
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `https://freshcutserverside.vercel.app/order/${orderId}`,
        { status: newStatus },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.data.success) {
        Swal.fire('Success', 'Order status updated!', 'success');
        refetch();
      } else {
        Swal.fire('Warning', 'No changes were made.', 'info');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update status.', 'error');
    }
  };

  const toggleStatusFilter = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredOrders = orders.filter((order) =>
    selectedStatuses.includes(order.status)
  );

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'shipping':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to load orders.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Filter by Status:</h4>
        {['pending', 'confirmed', 'shipping', 'delivered'].map((status) => (
          <label key={status} className="mr-4 inline-flex items-center space-x-1">
            <input
              type="checkbox"
              checked={selectedStatuses.includes(status)}
              onChange={() => toggleStatusFilter(status)}
              className="mr-1"
            />
            <span className={`px-2 py-1 rounded text-white text-sm ${statusColor(status)}`}>
              {status}
            </span>
          </label>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found for selected status.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
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
                <div className="mt-2 flex items-center gap-4">
                  <p>
                    <span className="font-medium mr-2">Status:</span>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <select
                    className="border px-2 py-1 rounded"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
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
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
