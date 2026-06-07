import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data } =
      await API.get(`/products/${id}`);

    setProduct(data);
  };

  if (!product)
    return <h2>Loading...</h2>;

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
    </div>
  );
}

export default ProductDetails;