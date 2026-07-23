import { useEffect, useState } from "react";

import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import ProductSkeleton from "../components/ProductSkeleton";

function Home() {
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalProducts, setTotalProducts] = useState(0);

  const [sort, setSort] = useState("newest")

  const [minPrice, setMinPrice] = useState("")

  const [maxPrice, setMaxPrice] = useState("")

  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
   
    try {
      
      setLoading(true)
      
      const { data } =  await API.get(`/products`,{
        params:{
          search:search,
          category:category,
          page:currentPage,
          limit:8,
          minPrice:minPrice,
          maxPrice:maxPrice,
          sort:sort,
        }
      });
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalProducts(data.totalProducts);

      console.log(data)
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

 useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [
    search,
    category,
    currentPage,
    minPrice,
    maxPrice,
    sort,
  ]);//whenever current page change re run the search 
  
  if (loading) {

  return (

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[...Array(8)].map((_, index) => (

            <ProductSkeleton
              key={index}
            />

          ))}

        </div>

      </div>

    );

  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          ShopSphere Products
        </h1>

        <p className="text-gray-500 mt-2">
          {totalProducts} Products Found
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) =>{
              setSearch(e.target.value)
              setCurrentPage(1)
            }
          }
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <select
          value={category}
          onChange={(e) =>{
              setCategory(e.target.value)
              setCurrentPage(1)
            }
          }
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >

          <option value="">
            All Categories
          </option>

          <option value="Mobiles">
            Mobiles
          </option>

          <option value="Laptops">
            Laptops
          </option>

          <option value="Shoes">
            Shoes
          </option>

          <option value="Watches">
            Watches
          </option>

        </select>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

  <input
    type="number"
    placeholder="Min Price"
    value={minPrice}
    onChange={(e) => {

      setMinPrice(e.target.value);

      setCurrentPage(1);

    }}
    className="border border-gray-300 rounded-lg p-3 w-full"
  />

  <input
      type="number"
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => {

        setMaxPrice(e.target.value);

        setCurrentPage(1);

      }}
      className="border border-gray-300 rounded-lg p-3 w-full"
  />

  <select
    value={sort}
    onChange={(e) => {
      setSort(e.target.value);
      setCurrentPage(1);
    }}
    className="border border-gray-300 rounded-lg p-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
  >
  <option value="newest">Newest</option>
  <option value="priceAsc">Price: Low to High</option>
  <option value="priceDesc">Price: High to Low</option>
  <option value="nameAsc">Name (A-Z)</option>
  <option value="nameDesc">Name (Z-A)</option>
</select>

  </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.length > 0 ? (

          products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))

        ) : (

          <div className="col-span-full text-center text-gray-500 text-xl py-10">
            No Products Found
          </div>

        )}

      </div>

      {/* Pagination Info */}
      <div className="flex justify-between items-center mt-10 border-t pt-5">

        <button
            disabled={currentPage === 1}
            onClick={() =>
                setCurrentPage(currentPage - 1)
            }
            className="bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
            Previous
        </button>

        <p className="font-semibold">
            Page {currentPage} of {totalPages}
        </p>

        <button
            disabled={
                currentPage === totalPages
            }
            onClick={() =>
                setCurrentPage(currentPage + 1)
            }
            className="bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
            Next
        </button>

      </div>

    </div>
  );
}
export default Home;