import API from "../api/axios";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const addToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist/add", {
        productId: product._id,
      });

      alert("Added to Wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">

      <Link to={`/products/${product._id}`}>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        <h3 className="font-bold mt-2">
          {product.name}
        </h3>

      </Link>

      <p className="text-green-600 mb-3">
        ₹{product.price}
      </p>

      <div className="flex gap-2">

        <button
          onClick={addToCart}
          className="border px-3 py-1 rounded"
        >
          Add To Cart
        </button>

        <button
          onClick={addToWishlist}
          className="border px-3 py-1 rounded"
        >
          Wishlist
        </button>

      </div>

    </div>
  );
}

export default ProductCard;