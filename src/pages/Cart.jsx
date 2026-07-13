import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import API from "../api/axios";
import { setCart } from "../redux/cartSlice";
import CartItem from "./CartItem";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");

      dispatch(setCart(data?.products || []));

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
      const { data } = await API.put("/cart/update", {
        productId,
        quantity,
      });

      dispatch(setCart(data?.products || []))

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
  ) || [];

  const removeItem = async (
      productId
    ) => {
      try {

        const { data } = await API.delete(
          "/cart/remove",
          {
              productId,
          }
        );

        dispatch(setCart(data?.products || []))

      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Shopping Cart
        </h1>

        <p className="text-gray-500 mt-2">
          {cartItems?.length} Items
        </p>
      </div>

      {cartItems?.length === 0 ? (

        <div className="bg-white rounded-xl shadow-md p-12 text-center">

          <div className="text-6xl">
            🛒
          </div>

          <h2 className="text-2xl font-semibold mt-4">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some amazing products to your cart.
          </p>

        </div>

      ) : (

        <>
          <div className="space-y-5">

            {cartItems.map((item,_) => (
              <CartItem
                key={item.product._id}
                item={item}
              />
            ))}

          </div>

          <div className="mt-8 bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Total
            </h2>

            <h2 className="text-3xl font-bold text-cyan-600">
              ₹{total}
            </h2>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;