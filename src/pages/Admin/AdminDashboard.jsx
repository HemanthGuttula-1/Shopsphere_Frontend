import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard/stats");
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">
            Total Users
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">
            Total Products
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{stats.totalRevenue}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <Link
          to="/admin/add-product"
          className="bg-green-600 text-white text-center p-4 rounded-lg hover:bg-green-700"
        >
          Add Product
        </Link>

        <Link
          to="/admin/products"
          className="bg-blue-600 text-white text-center p-4 rounded-lg hover:bg-blue-700"
        >
          Manage Products
        </Link>

        <Link
          to="/admin/orders"
          className="bg-purple-600 text-white text-center p-4 rounded-lg hover:bg-purple-700"
        >
          Manage Orders
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;