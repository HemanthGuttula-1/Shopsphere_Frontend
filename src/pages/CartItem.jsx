import API from "../api/axios";
import { useDispatch } from "react-redux";

import { setCart } from "../redux/cartSlice";

function CartItem({
  item,
  fetchCart,
}) {
  const dispatch = useDispatch();

  const updateQuantity = async (quantity) => {
    if (quantity < 1) return;

    try {
      const { data } = await API.put("/cart/update", {
        productId: item.product._id,
        quantity,
      });

      dispatch(setCart(data.products));
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async () => {
    try {
      const { data } = await API.delete("/cart/remove", {
        data: {
          productId: item.product._id,
        },
      });

      dispatch(setCart(data.products));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-6 items-center">

      {/* Product Image */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-40 h-40 object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="flex-1">

        <h2 className="text-xl font-bold text-slate-800">
          {item.product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          ₹{item.product.price}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-4 mt-5">

          <button
            onClick={() =>
              updateQuantity(item.quantity - 1)
            }
            className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            −
          </button>

          <span className="text-lg font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              updateQuantity(item.quantity + 1)
            }
            className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            +
          </button>

        </div>

      </div>

      {/* Price Section */}
      <div className="text-right">

        <p className="text-2xl font-bold text-cyan-600">
          ₹{item.product.price * item.quantity}
        </p>

        <button
          onClick={removeItem}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;