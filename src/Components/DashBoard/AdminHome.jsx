import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const AdminHome = () => {
  // Fetch products
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('https://freshcutserverside.vercel.app/products');
      return res.data;
    },
  });

  // Fetch users
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('https://freshcutserverside.vercel.app/users');
      return res.data;
    },
  });

  const getTopSelling = (products) => {
    return [...products]
      .sort((a, b) => b.sellCount - a.sellCount)
      .slice(0, 5)
      .map((product) => ({
        name: product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name,
        sellCount: product.sellCount,
      }));
  };

  if (productsLoading || usersLoading) return <p>Loading dashboard...</p>;
  if (productsError || usersError) return <p>Failed to load dashboard data.</p>;

  const topSelling = getTopSelling(products);
  const totalUsers = users.length;
  const totalProducts = products.length;

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold">Admin Home Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 dark:bg-blue-800 dark:text-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold">Total Users</h4>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{totalUsers}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-800 dark:text-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold">Total Products</h4>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">{totalProducts}</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-800 dark:text-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold">Top Products Count</h4>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">
            {topSelling.length}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSelling} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8884d8' }} />
            <YAxis tick={{ fill: '#8884d8' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#2d3748', border: 'none' }}
              labelStyle={{ color: '#f7fafc' }}
              itemStyle={{ color: '#f7fafc' }}
            />
            <Bar dataKey="sellCount" fill="#4ade80" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminHome;
