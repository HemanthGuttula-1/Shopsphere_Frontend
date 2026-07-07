import API from "../api/axios";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setCart } from '../redux/cartSlice'
import { setWishlist } from "../redux/wishlistSlice";

function ProductCard({ product }) {
  const dispatch  = useDispatch()

  const addToCart = async () => {
    try {
      const { data } =  await API.post("/cart/add", {
                          productId: product._id,
                          quantity: 1,
      });

      console.log("Whole Response:", data);
      dispatch(setCart(data.products))
      console.log("after dispatch:", data.products);

      alert("Added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    try {
      
      const { data }  = await API.post("/wishlist/add", {
                            productId: product._id,
                        });

      dispatch(setWishlist(data.products));

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
          onClick={()=>addToCart(product)}
          className="border px-3 py-1 rounded"
        >
          Add To Cart
        </button>

        <button
          onClick={()=>addToWishlist(product)}
          className="border px-3 py-1 rounded"
        >
          Wishlist
        </button>

      </div>

    </div>
  );
}

export default ProductCard;