import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

function ManageProducts() {

  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {

      const limit = 8;

      const { data } = await API.get("/products",{
        params:{
          limit: limit,
          page: currentPage,
        }
      });

      console.log("fetch :",data)
      setProducts(data.products);
      setTotalPages(data.totalPages)
    } catch (error) {

      console.log(error);

    }
  };

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Failed to delete product");

    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Manage Products
        </h1>

        <Link
          to="/admin/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product._id}
            className="border rounded-lg shadow-md p-4"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {product.description}
            </p>

            <p className="text-lg text-green-600 font-bold mt-2">
              ₹{product.price}
            </p>

            <p className="mt-1">
              Stock : {product.stock}
            </p>

            <p className="mb-4">
              Category : {product.category}
            </p>

            <div className="flex justify-between">

              <Link
                to={`/admin/edit-product/${product._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

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

export default ManageProducts;