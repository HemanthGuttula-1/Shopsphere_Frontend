import { useEffect, useState }
from "react";

import API from "../api/axios";

function Orders() {

  const [orders,
    setOrders] = useState([]);

  const fetchOrders =
    async () => {

      const { data } =
        await API.get(
          "/orders/my-orders"
        );

      setOrders(data);
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>

      <h1>
        My Orders
      </h1>

      {orders.map(
        (order) => (

        <div
          key={order._id}
        >

          <h3>
            Order:
            {order._id}
          </h3>

          <p>
            ₹
            {order.totalAmount}
          </p>

          <p>
            {order.orderStatus}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Orders;