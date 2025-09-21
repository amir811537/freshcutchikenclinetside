/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import CartOverview from "./CartOverview";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Helper: parse English month from date string like "21 May 25"
const parseEnglishDate = (dateStr) => {
  if (!dateStr) return { month: "" };
  const parts = dateStr.split(" ");
  const month = parts[1]?.replace(",", "");
  return { month };
};

// Group sales by month
const getMonthlySalesData = (data) => {
  const monthSalesMap = {};

  data.forEach((item) => {
    const { month } = parseEnglishDate(item.date);
    if (!month) return;
    const saleAmount = parseFloat(item.sale || 0);
    if (!monthSalesMap[month]) {
      monthSalesMap[month] = 0;
    }
    monthSalesMap[month] += saleAmount;
  });

  return Object.keys(monthSalesMap).map((month) => ({
    month,
    totalSale: monthSalesMap[month],
  }));
};


const getTopSelling = (products) => {
  return [...products]
    .sort((a, b) => b.sellCount - a.sellCount)
    .slice(0, 5)
    .map((product) => ({
      name:
        product.name.length > 20
          ? product.name.slice(0, 20) + "..."
          : product.name,
      sellCount: product.sellCount,
    }));
};

const AdminHome = () => {

const axiosPublic = useAxiosPublic();


  // Fetch products
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/products"
      );
      return res.data;
    },
  });

  // Fetch users
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/users"
      );
      return res.data;
    },
  });

  // Fetch CMS sales data
  const {
    data: cmsData = [],
    isLoading: cmsLoading,
    isError: cmsError,
  } = useQuery({
    queryKey: ["cmsData"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/cms"
      );
      return res.data;
    },
  });

  if (productsLoading || usersLoading || cmsLoading)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  if (productsError || usersError || cmsError)
    return <p>Failed to load dashboard data.</p>;

  const topSelling = getTopSelling(products);
  const totalUsers = users.length;
  const totalProducts = products.length;
  const monthlySalesData = getMonthlySalesData(cmsData);

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold">Admin Home Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 dark:bg-blue-800 dark:text-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold">Total Users</h4>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            {totalUsers}
          </p>
        </div>
        <div className="bg-green-100 dark:bg-green-800 dark:text-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold">Total Products</h4>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">
            {totalProducts}
          </p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-800 dark:text-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-semibold">Top Products Count</h4>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">
            {topSelling.length}
          </p>
        </div>

<CartOverview topSelling={topSelling} monthlySalesData={monthlySalesData}  />


      </div>
    </div>
  );
};

export default AdminHome;
