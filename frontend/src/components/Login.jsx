// src/components/Login.jsx
import React from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import Google from "./Google";

const Login = ({ onSwitch }) => {
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

      <form>
        {/* Email */}
        <div className="relative mb-4">
          <FiUser
            className="absolute top-1/2 left-4 -translate-y-1/2"
            style={{ color: "var(--text-main)" }}
          />
          <input
            type="text"
            name="email"
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
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none transition"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-main)",
            }}
          />
        </div>

        {/* Sign In Button */}
        <button
          type="button"
          className="w-full py-3 font-medium rounded-full transition"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "white",
          }}
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr
          className="flex-grow"
          style={{ borderColor: "var(--border-light)" }}
        />
        <span
          className="px-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          OR
        </span>
        <hr
          className="flex-grow"
          style={{ borderColor: "var(--border-light)" }}
        />
      </div>

      <Google />

      {/* Footer Links */}
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
