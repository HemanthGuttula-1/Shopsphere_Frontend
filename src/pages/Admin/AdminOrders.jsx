import { useEffect, useState } from "react";
import API from "../../api/axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/all");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, {
        orderStatus: status,
      });

      fetchOrders();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Manage Orders
      </h1>

      {orders.map((order) => (

        <div
          key={order._id}
          className="border rounded-lg shadow-md p-6 mb-6"
        >

          <h2 className="text-xl font-semibold mb-2">
            {order.user.name}
          </h2>

          <p>Email : {order.user.email}</p>

          <p>Total : ₹{order.totalAmount}</p>

          <p>Payment : {order.paymentStatus}</p>

          <div className="my-4">

            <h3 className="font-semibold">
              Products
            </h3>

            {order.products.map((item) => (

              <div
                key={item.product._id}
                className="flex items-center gap-4 my-3"
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded object-cover"
                />

                <div>

                  <p>{item.product.name}</p>

                  <p>
                    Qty : {item.quantity}
                  </p>

                </div>

              </div>

            ))}

          </div>

          <div className="flex gap-4 items-center">

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(
                  order._id,
                  e.target.value
                )
              }
              className="border p-2 rounded"
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>

      ))}

    </div>
  );
}

export default AdminOrders;