import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";


const CartOverview = ({ monthlySalesData, topSelling }) => {
  // Define some colors for pie slices
  const COLORS = ["#4ade80", "#60a5fa", "#f87171", "#fbbf24", "#a78bfa", "#34d399"];

  return (
    <>
      {/* Monthly Sales Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          Monthly Sales Overview (CMS Data)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlySalesData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8884d8" }} />
            <YAxis tick={{ fill: "#8884d8" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#2d3748", border: "none" }}
              labelStyle={{ color: "#f7fafc" }}
              itemStyle={{ color: "#f7fafc" }}
              formatter={(value) => [`৳${value}`, "Total Sale"]}
            />
            <Bar dataKey="totalSale" fill="#4ade80" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Selling Products Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topSelling}
              dataKey="sellCount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {topSelling.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} pcs`, name]}
              contentStyle={{ backgroundColor: "#2d3748", border: "none" }}
              labelStyle={{ color: "#f7fafc" }}
              itemStyle={{ color: "#f7fafc" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

CartOverview.propTypes = {
  monthlySalesData: PropTypes.array.isRequired,
  topSelling: PropTypes.array.isRequired,
};

export default CartOverview;
