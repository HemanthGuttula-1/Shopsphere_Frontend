import { useEffect, useState }
from "react";

import API from "../api/axios";

function AdminDashboard() {

  const [stats,
    setStats] =
      useState({});

  const fetchStats =
    async () => {

      const { data } =
        await API.get(
          "/dashboard/stats"
        );

      setStats(data);
    };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>

      <h1>
        Dashboard
      </h1>

      <p>
        Users:
        {stats.totalUsers}
      </p>

      <p>
        Products:
        {stats.totalProducts}
      </p>

      <p>
        Orders:
        {stats.totalOrders}
      </p>

      <p>
        Revenue:
        ₹
        {stats.totalRevenue}
      </p>

    </div>
  );
}

export default AdminDashboard;