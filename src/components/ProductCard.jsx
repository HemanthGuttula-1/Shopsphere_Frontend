import API from "../api/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCart } from "../redux/cartSlice";
import { setWishlist } from "../redux/wishlistSlice";

function ProductCard({
  product,
  showWishlistButton = true,
}) {
  const dispatch = useDispatch();

  const addToCart = async () => {
    try {
      const { data } = await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      dispatch(setCart(data.products));

      alert("Added to Cart");
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    try {
      const { data } = await API.post("/wishlist/add", {
        productId: product._id,
      });

      dispatch(setWishlist(data.products));

      alert("Added to Wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <Link to={`/products/${product._id}`}>

        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-4">

          <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-2xl font-bold text-cyan-600 mt-3">
            ₹{product.price}
          </p>

        </div>

      </Link>

      <div className="px-4 pb-4 flex gap-3">

        <button
          onClick={addToCart}
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition duration-300"
        >
          Add to Cart
        </button>

        {showWishlistButton && (

          <button
            onClick={addToWishlist}
            className="border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white px-4 rounded-lg transition duration-300"          
          >
            ❤️
          </button>

        )}

      </div>

    </div>
  );
}

export default ProductCard;