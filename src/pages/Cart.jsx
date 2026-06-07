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

    const { data } =
      await API.get("/cart");

    dispatch(
      setCart(data?.products || [])
    );
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>

      <h1>Cart</h1>

      {cartItems.map((item) => (
        <div key={item.product._id}>

          <h3>
            {item.product.name}
          </h3>

          <p>
            Qty: {item.quantity}
          </p>

        </div>
      ))}

    </div>
  );
}

export default Cart;