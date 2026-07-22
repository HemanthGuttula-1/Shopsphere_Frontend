import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { loginSuccess } from "../redux/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/login",
        form
      );

      console.log("Login Data:",data)
      dispatch(loginSuccess(data));

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-600">
            ShopSphere
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Login to continue shopping.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-cyan-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;