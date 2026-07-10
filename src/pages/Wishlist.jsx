import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

function Wishlist() {

  const [wishlist, setWishlist] =
    useState([]);

  const fetchWishlist =
    async () => {

      try {

        const { data } =
          await API.get(
            "/wishlist"
          );

        setWishlist(
          data?.products || []
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-800">
        ❤️ My Wishlist
      </h1>

      <p className="text-gray-500 mt-2">
        {wishlist.length} Products Saved
      </p>
    </div>

    {wishlist.length === 0 ? (

      <div className="bg-white rounded-2xl shadow-md p-10 text-center">

        <div className="text-6xl mb-4">
          ❤️
        </div>

        <h2 className="text-2xl font-semibold text-slate-700">
          Your Wishlist is Empty
        </h2>

        <p className="text-gray-500 mt-3">
          Save your favorite products and they will appear here.
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {wishlist.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            showWishlistButton={false}
          />
        ))}

      </div>

    )}

  </div>
  );
}

export default Wishlist;