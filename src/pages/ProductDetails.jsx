import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import API from "../api/axios";
import { setCart } from "../redux/cartSlice";

import { toast } from 'react-toastify'

function ProductDetails() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]) 
  
  const addToCart = async () => {
    try {

      const { data } = await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      dispatch(setCart(data.products));

      toast.success("Added To Cart");

    } catch (error) {

      console.log(error);

    }

  };

  const fetchProduct = async () => {

    try {

      const { data } = await API.get(`/products/${id}`);

      setProduct(data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchRelatedProducts = async () => {

    try {

      const { data } = await API.get(`/products/related/${id}`);

      setRelatedProducts(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProduct();

    fetchRelatedProducts();

  }, [id]);

  if (!product) {

    return <h2 className="text-center mt-10">Loading...</h2>;

  }


  return (

    <div className="max-w-6xl mx-auto p-6">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-contain rounded-xl border shadow-lg"
        />

        <div className="space-y-4">

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-3xl font-semibold text-green-600">
            ₹{product.price}
          </p>

          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {product.category}
          </span>

          <p className="text-gray-600 leading-7">
            {product.description}
          </p>

          <p>
            Stock :
            <span
              className={
                product.stock > 0
                  ? "text-green-600 font-bold ml-2"
                  : "text-red-600 font-bold ml-2"
              }
            >
              {product.stock > 0
                ? `${product.stock} Available`
                : "Out Of Stock"}
            </span>
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
            >
              🛒 Add To Cart
            </button>

          </div>

        </div>

      </div>

      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-8">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {relatedProducts.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;