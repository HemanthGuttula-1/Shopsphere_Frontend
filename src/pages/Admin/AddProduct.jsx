import { useState } from "react";
import API from "../../api/axios";

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
    console.log(image)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      console.log(image)
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      data.append("image", image);

      const res = await API.post("/admin/products", data);
      console.log(res)
      alert(res.data.message);

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
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className="bg-black text-white px-5 py-2 rounded"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;