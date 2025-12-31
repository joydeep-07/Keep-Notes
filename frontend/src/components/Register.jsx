// src/components/Register.jsx
import React from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Google from "./Google";

const Register = ({ onSwitch }) => {
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

      <form>
        {/* Firstname & Lastname */}
        <div className="flex gap-2 mb-4">
          <div className="relative w-1/2">
            <FiUser
              className="absolute top-1/2 left-4 -translate-y-1/2"
              style={{ color: "var(--text-main)" }}
            />
            <input
              type="text"
              placeholder="Firstname"
              className="w-full pl-12 pr-4 py-3 rounded-full outline-none transition"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-main)",
              }}
            />
          </div>

          <div className="relative w-1/2">
            <FiUser
              className="absolute top-1/2 left-4 -translate-y-1/2"
              style={{ color: "var(--text-main)" }}
            />
            <input
              type="text"
              placeholder="Lastname"
              className="w-full pl-12 pr-4 py-3 rounded-full outline-none transition"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-main)",
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FiMail
            className="absolute top-1/2 left-4 -translate-y-1/2"
            style={{ color: "var(--text-main)" }}
          />
          <input
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none transition"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-main)",
            }}
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <FiLock
            className="absolute top-1/2 left-4 -translate-y-1/2"
            style={{ color: "var(--text-main)" }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full pl-12 pr-4 py-3 rounded-full outline-none transition"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-main)",
            }}
          />
        </div>

        {/* Register Button */}
        <button
          type="button"
          className="w-full py-3 font-medium rounded-full transition"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "white",
          }}
        >
          Register
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

      {/* Google Register */}
      <Google />

      {/* Footer Links */}
      <div className="flex justify-between items-center text-sm mt-3">
        <span style={{ color: "var(--text-secondary)" }}>
          Already have an account?
          <span
            onClick={onSwitch}
            className="font-medium ml-2 cursor-pointer hover:underline"
            style={{ color: "var(--accent-primary)" }}
          >
            Login
          </span>
        </span>

        <span
          className="hover:underline cursor-pointer"
          style={{ color: "var(--text-secondary)" }}
        >
          Terms & conditions
        </span>
      </div>
    </div>
  );
};

export default Register;
