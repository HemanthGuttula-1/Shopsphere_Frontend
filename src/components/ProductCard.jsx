import API from "../api/axios";

function ProductCard({ product }) {

  const addToCart = async () => {

    try {

      await API.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1,
        }
      );

      alert("Added to cart");

    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist =
    async () => {

    await API.post(
        "/wishlist/add",
        {
        productId:
            product._id,
        }
    );

    alert(
        "Added to Wishlist"
    );
    };

  return (
    <div>

      <div className="border p-4 rounded-lg shadow">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
        />

        <h3 className="font-bold mt-2">
            {product.name}
        </h3>

        <p className="text-green-600">
            ₹{product.price}
        </p>
      </div>

      <button
        onClick={addToCart}
      >
        Add To Cart
      </button>

      <button
        onClick={addToWishlist}
      >
        Wishlist
      </button>

    </div>
  );
}

export default ProductCard;