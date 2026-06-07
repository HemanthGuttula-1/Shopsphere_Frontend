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

      dispatch(loginSuccess(data));

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;