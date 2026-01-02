// src/components/Login.jsx
import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice";
import Google from "./Google";
import { AUTH_ENDPOINTS } from "../utils/endpoint";

const Login = ({ onSwitch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(AUTH_ENDPOINTS.LOGIN, formData);

      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token,
        })
      );

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex flex-col w-4xl">
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
          <FiUser
            className="absolute top-1/2 left-4 -translate-y-1/2"
            style={{ color: "var(--text-main)" }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none transition"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-main)",
            }}
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <FiLock
            className="absolute top-1/2 left-4 -translate-y-1/2"
            style={{ color: "var(--text-main)" }}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none transition"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-main)",
            }}
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
        <hr className="flex-grow text-[var(--text-secondary)]/30 " />
        <span className="px-2 text-sm">OR</span>
        <hr className="flex-grow text-[var(--text-secondary)]/30" />
      </div>

      <Google />

      {/* Footer */}
      <div className="flex justify-between items-center text-sm mt-3">
        <span style={{ color: "var(--text-secondary)" }}>
          Don’t have an account?
          <span
            onClick={onSwitch}
            className="font-medium ml-2 cursor-pointer hover:underline"
            style={{ color: "var(--accent-primary)" }}
          >
            Sign Up
          </span>
        </span>

        <Link
          to="/forgot/password"
          className="hover:underline"
          style={{ color: "var(--text-secondary)" }}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
