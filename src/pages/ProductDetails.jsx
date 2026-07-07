import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(
        `/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added To Cart");
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist/add", {
        productId: product._id,
      });

      alert("Added To Wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
        width="300"
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

      <p>Stock: {product.stock}</p>

      <button onClick={addToCart}>
        Add To Cart
      </button>

      <button onClick={addToWishlist}>
        Add To Wishlist
      </button>
    </div>
  );
}

export default ProductDetails;