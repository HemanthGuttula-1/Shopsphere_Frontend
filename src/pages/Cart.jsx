import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import API from "../api/axios";
import { setCart } from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");

      dispatch(
        setCart(data?.products || [])
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    if (quantity < 1) return;

    try {
      await API.put("/cart/update", {
        productId,
        quantity,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      item.product.price *
        item.quantity,
    0
  );

  const removeItem = async (
      productId
    ) => {
      try {

        await API.delete(
          "/cart/remove",
          {
            data: {
              productId,
            },
          }
        );

        fetchCart();

      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.product._id}
            className="border p-4 rounded mb-3"
          >
            <h3>
              {item.product.name}
            </h3>

            <p>
              Price: ₹
              {item.product.price}
            </p>

            <div className="flex gap-3 items-center">
              <button
                onClick={() =>
                  updateQuantity(
                    item.product._id,
                    item.quantity - 1
                  )
                }
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQuantity(
                    item.product._id,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                removeItem(
                  item.product._id
                )
              }
            >
              Remove
            </button>

            <p>
              Subtotal: ₹
              {item.product.price *
                item.quantity}
            </p>
          </div>
        ))
      )}

      <h2>
        Total: ₹{total}
      </h2>
    </div>
  );
}

export default Cart;