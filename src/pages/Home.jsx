import { useEffect, useState } from "react";

import API from "../api/axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [search, setSearch] = useState("");

  const [products, setProducts] =
    useState([]);

  const fetchProducts = async () => {
    try {
      const { data } =
        await API.get("/products");

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts =
  products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>

      <h1>
        ShopSphere Products
      </h1>
      <input
        placeholder="Search Product"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>
  );
}

export default Home;