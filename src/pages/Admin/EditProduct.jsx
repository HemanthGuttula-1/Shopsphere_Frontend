import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";

const categories = [
  "Mobile",
  "Laptop",
  "Watch",
  "Shoes",
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");


  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      console.log("Editproduct:",data)
      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        brand: data.brand,
        stock: data.stock,
      });

      setPreview(data.image);

    } catch (error) {
      console.log(error);
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (image) {
        data.append("image", image);
      }

      await API.put(`/admin/products/${id}`, data);

      alert("Product Updated Successfully");

      navigate("/admin/products");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border">

        <div className="bg-black text-white rounded-t-2xl px-8 py-5">
          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>
          <p className="text-gray-300 mt-1">
            Update the product details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          <div>
            <label className="font-semibold block mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-semibold block mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-semibold block mb-2">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              >
                <option value="">Select Category</option>

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

          <div>

            <label className="font-semibold block mb-3">
              Current Image
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg border mb-4"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

          </div>

          <button
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProduct;