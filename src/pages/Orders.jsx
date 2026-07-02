import { useEffect, useState } from "react";
import API from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/my-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-md p-6 mb-6"
          >
            <div className="mb-4">
              <p>
                <strong>Order ID :</strong>{" "}
                {order._id}
              </p>

              <p>
                <strong>Status :</strong>{" "}
                {order.orderStatus}
              </p>

              <p>
                <strong>Payment :</strong>{" "}
                {order.paymentStatus}
              </p>

              <p>
                <strong>Total :</strong> ₹
                {order.totalAmount}
              </p>
            </div>

            <hr className="mb-4" />

            {order.products.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-5 mb-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-28 h-28 object-cover rounded"
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {item.product.name}
                  </h2>

                  <p>
                    ₹{item.product.price}
                  </p>

                  <p>
                    Quantity :
                    {" "}
                    {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;