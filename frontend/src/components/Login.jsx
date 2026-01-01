// src/components/Login.jsx
import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Google from "./Google";
import { AUTH_ENDPOINTS } from "../utils/endpoint";

const Login = ({ onSwitch }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      return setError("Email and password are required");
    }

    try {
      setLoading(true);

      const res = await axios.post(AUTH_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to notes page (change if needed)
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex flex-col w-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-4xl font-semibold mt-2 mb-5"
          style={{ color: "var(--text-main)" }}
        >
          LOGIN
        </h2>
      </div>

      <form onSubmit={handleLogin}>
        {/* Email */}
        <div className="relative mb-4">
          <FiUser className="absolute top-1/2 left-4 -translate-y-1/2" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-4 -translate-y-1/2" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-medium rounded-full transition"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "white",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow" />
        <span className="px-2 text-sm">OR</span>
        <hr className="flex-grow" />
      </div>

      <Google />

      {/* Footer Links */}
      <div className="flex justify-between items-center text-sm mt-3">
        <span>
          Don’t have an account?
          <span
            onClick={onSwitch}
            className="font-medium ml-2 cursor-pointer hover:underline"
            style={{ color: "var(--accent-primary)" }}
          >
            Sign Up
          </span>
        </span>

        <Link to="/forgot/password" className="hover:underline">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
