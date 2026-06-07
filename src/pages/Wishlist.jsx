import { useEffect } from "react";

import API from "../api/axios";

function Wishlist() {

  const fetchWishlist =
    async () => {

      const { data } =
        await API.get(
          "/wishlist"
        );

      console.log(data);
    };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <h1>
      Wishlist Page
    </h1>
  );
}

export default Wishlist;