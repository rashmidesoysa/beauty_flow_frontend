import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaExclamationTriangle,
  FaClock,
  FaUsers,
  FaShoppingCart,
  FaEye,
  FaCheckCircle,
  FaTruck,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
          {value}
        </p>
        {trend && (
          <div
            className={`flex items-center gap-1 mt-2 text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {trend === "up" ? (
              <FaArrowUp size={10} />
            ) : (
              <FaArrowDown size={10} />
            )}
            <span>{trendValue} from last month</span>
          </div>
        )}
      </div>
      <div className={`${color} p-3 rounded-2xl text-white shadow-lg`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

// Order Status Badge Component
const OrderStatus = ({ status }) => {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-700",
      icon: FaClock,
      label: "Pending",
    },
    processing: {
      color: "bg-blue-100 text-blue-700",
      icon: FaTruck,
      label: "Processing",
    },
    completed: {
      color: "bg-green-100 text-green-700",
      icon: FaCheckCircle,
      label: "Completed",
    },
    cancelled: {
      color: "bg-red-100 text-red-700",
      icon: FaExclamationTriangle,
      label: "Cancelled",
    },
  };
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 125430,
    lowStockItems: 8,
    pendingOrders: 23,
    totalCustomers: 1452,
    totalProducts: 345,
    completedOrders: 1245,
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: "#1001",
      customer: "Sarah Johnson",
      amount: 125.0,
      status: "pending",
      date: "2024-01-15",
      items: 3,
    },
    {
      id: "#1002",
      customer: "Michael Chen",
      amount: 89.99,
      status: "processing",
      date: "2024-01-15",
      items: 2,
    },
    {
      id: "#1003",
      customer: "Emma Williams",
      amount: 245.5,
      status: "completed",
      date: "2024-01-14",
      items: 5,
    },
    {
      id: "#1004",
      customer: "James Brown",
      amount: 67.9,
      status: "pending",
      date: "2024-01-14",
      items: 1,
    },
    {
      id: "#1005",
      customer: "Lisa Anderson",
      amount: 189.99,
      status: "completed",
      date: "2024-01-13",
      items: 4,
    },
  ]);

  // Chart data
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue 2024",
        data: [
          12500, 15200, 16800, 18900, 21500, 23400, 25600, 27800, 29500, 31200,
          33500, 35800,
        ],
        borderColor: "rgb(236, 72, 153)",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const topProducts = [
    { name: "Luxury Lipstick Set", sales: 234, revenue: 4678, growth: "+15%" },
    { name: "Organic Face Cream", sales: 189, revenue: 3789, growth: "+22%" },
    { name: "Volumizing Mascara", sales: 156, revenue: 2345, growth: "+8%" },
    { name: "Matte Foundation", sales: 134, revenue: 2678, growth: "+12%" },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's your business overview
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition flex items-center gap-2">
            <FaChartLine size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`${stats.totalRevenue.toLocaleString()}`}
          icon={FaDollarSign}
          color="bg-gradient-to-br from-green-400 to-green-600"
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          icon={FaExclamationTriangle}
          color="bg-gradient-to-br from-yellow-400 to-yellow-600"
          trend="down"
          trendValue="-3 from last month"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={FaClock}
          color="bg-gradient-to-br from-blue-400 to-blue-600"
          trend="up"
          trendValue="+5 this week"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          icon={FaUsers}
          color="bg-gradient-to-br from-pink-400 to-purple-600"
          trend="up"
          trendValue="+18 new"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Revenue Overview
            </h2>
            <select className="text-sm border rounded-lg px-3 py-1 bg-white">
              <option>This Year</option>
              <option>Last Year</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-80">
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">
                    {product.name}
                  </p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {product.sales} sales
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.revenue}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {product.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-500 mt-1">Latest customer orders</p>
          </div>
          <button className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center gap-1">
            View All Orders
            <FaEye size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-pink-600" size={16} />
                      </div>
                      <span className="text-sm text-gray-900">
                        {order.customer}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {order.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatus status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing 5 of 23 orders</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-2">Low Stock Alert</h3>
          <p className="text-sm opacity-90">
            8 products are running low on stock
          </p>
          <button className="mt-3 px-4 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition">
            View Inventory
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-2">Pending Reviews</h3>
          <p className="text-sm opacity-90">
            12 customer reviews awaiting moderation
          </p>
          <button className="mt-3 px-4 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition">
            Moderate Reviews
          </button>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-2">Monthly Report</h3>
          <p className="text-sm opacity-90">Download December 2024 report</p>
          <button className="mt-3 px-4 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
