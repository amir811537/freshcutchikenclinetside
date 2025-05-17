import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const OrderHistory = () => {
  const {
    data: history = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orderHistory'],
    queryFn: async () => {
      const res = await axios.get('https://freshcutserverside.vercel.app/orderhistory');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading order history...</p>;
  if (isError) return <p>Failed to load order history.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {history.length === 0 ? (
        <p>No delivered orders found in history.</p>
      ) : (
        <div className="space-y-6">
          {history.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm bg-white dark:bg-black dark:text-white">
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
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
