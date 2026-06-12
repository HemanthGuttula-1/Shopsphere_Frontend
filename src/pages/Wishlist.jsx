import { useEffect, useState } from "react";
import API from "../api/axios";

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
    <div>

      <h1>
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h3>
          Wishlist is Empty
        </h3>
      ) : (
        wishlist.map(
          (product) => (

            <div
              key={product._id}
              className="
                border
                p-4
                rounded
                mb-3
              "
            >

              <img
                src={product.image}
                alt={product.name}
                width="150"
              />

              <h3>
                {product.name}
              </h3>

              <p>
                {product.description}
              </p>

              <p>
                ₹{product.price}
              </p>

            </div>
          )
        )
      )}

    </div>
  );
}

export default Wishlist;