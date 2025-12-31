// src/components/Login.jsx
import React from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import Google from "./Google";

const Login = ({ onSwitch }) => {
  return (
    <div className="bg-transparent flex flex-col w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-4xl text-white font-semibold mt-2 mb-5">LOGIN</h2>
      </div>

      <form>
        <div className="relative mb-4">
          <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-white" />
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-full outline-none focus:bg-white/25"
          />
        </div>

        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-white" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-full outline-none focus:bg-white/25"
          />
        </div>

        <button
          type="button"
          className="w-full py-3 bg-white/70 text-black font-medium rounded-full hover:bg-white/50 transition"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-600" />
        <span className="text-gray-400 px-2 text-sm">OR</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      <Google />

      <div className="flex justify-between items-center text-gray-300 text-sm mt-3">
        <span>
          Don’t have an account?
          <span
            onClick={onSwitch}
            className="text-white font-medium ml-2 cursor-pointer hover:underline"
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
