// src/components/Register.jsx
import React, { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import Google from "./Google";
import { AUTH_ENDPOINTS } from "../utils/endpoint";

const Register = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE REGISTER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { name, surname, email, password, confirmPassword } = formData;

    if (!name || !surname || !email || !password) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post(AUTH_ENDPOINTS.REGISTER, {
        name,
        surname,
        email,
        password,
      });

      // Optional: auto switch to login after success
      onSwitch();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex flex-col w-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl font-semibold mt-2 mb-5"
          style={{ color: "var(--text-main)" }}
        >
          SIGN UP
        </h2>
      </div>

      <form onSubmit={handleRegister}>
        {/* Firstname & Lastname */}
        <div className="flex gap-2 mb-4">
          <div className="relative w-1/2">
            <FiUser className="absolute top-1/2 left-4 -translate-y-1/2" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Firstname"
              className="w-full pl-12 pr-4 py-3 rounded-full outline-none"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            />
          </div>

          <div className="relative w-1/2">
            <FiUser className="absolute top-1/2 left-4 -translate-y-1/2" />
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              type="text"
              placeholder="Lastname"
              className="w-full pl-12 pr-4 py-3 rounded-full outline-none"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FiMail className="absolute top-1/2 left-4 -translate-y-1/2" />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-4 -translate-y-1/2" />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-4 -translate-y-1/2" />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Register Button */}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow" />
        <span className="px-2 text-sm">OR</span>
        <hr className="flex-grow" />
      </div>

      <Google />

      {/* Footer */}
      <div className="flex justify-between items-center text-sm mt-3">
        <span>
          Already have an account?
          <span
            onClick={onSwitch}
            className="font-medium ml-2 cursor-pointer hover:underline"
            style={{ color: "var(--accent-primary)" }}
          >
            Login
          </span>
        </span>
      </div>
    </div>
  );
};

export default Register;
