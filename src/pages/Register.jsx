import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await API.post(
        "/auth/register",
        form
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

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
        Register
      </button>
    </form>
  );
}

export default Register;