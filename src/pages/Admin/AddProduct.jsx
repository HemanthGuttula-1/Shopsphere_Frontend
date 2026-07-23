import { useState } from "react";
import API from "../../api/axios";

import { toast } from 'react-toastify'

const categories = [
  "Mobile",
  "Laptop",
  "Watch",
  "Shoes",
];

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      data.append("image", image);

      const res = await API.post("/admin/products", data);

      toast.success(res.data?.message);

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
      });

      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">

        {/* Header */}
        <div className="bg-black text-white rounded-t-2xl px-8 py-5">
          <h1 className="text-3xl font-bold">
            Add New Product
          </h1>
          <p className="text-gray-300 mt-1">
            Fill in the product details below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          {/* Product Name */}
          <div>
            <label className="block font-semibold mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="iPhone 17 Pro Max"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description..."
              className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Price & Stock */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="59999"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="50"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          {/* Brand & Category */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold mb-2">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Apple"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">
              Product Image
            </label>

            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-black transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
                className="w-full cursor-pointer"
                required
              />

              {image && (
                <p className="mt-3 text-sm text-green-600 font-medium">
                  Selected: {image.name}
                </p>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;