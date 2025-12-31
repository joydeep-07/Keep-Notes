import React, { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiAlertCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../components/AuthImagePattern";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setAuthError("");
    setIsLoading(true);

    try {
      console.log("Login data:", data);
      reset();
      navigate("/");
    } catch (error) {
      setAuthError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20 mb-8 flex items-center p-4">
      <div className="w-full overflow-hidden lg:grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex  flex-col items-center p-6 sm:p-10">
          <div className="w-full mt-16 max-w-lg space-y-6 lg:scale-[0.95]">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FiMessageSquare className="w-5 h-5 text-indigo-600" />
                </div>
                <h1 className="text-xl font-bold mt-2 text-gray-800">
                  Welcome Back!
                </h1>
                <p className="text-sm text-gray-600">Sign in to your account</p>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-sm text-red-700 rounded-lg flex items-center">
                <FiAlertCircle className="mr-2" />
                {authError}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                  <input
                    type="email"
                    className={`w-full pl-10 py-1.5 text-sm border-b ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-1.5 text-sm border-b ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500`}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-sm" />
                    ) : (
                      <FiEye className="text-sm" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-indigo-600 font-medium">
                    Sign Up
                  </Link>
                </span>
                <Link
                  to="/forgot-password"
                  className="text-indigo-600 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <AuthImagePattern
          title="New Here?"
          subtitle="Join our health community and get access to top-tier medical services."
        />
      </div>
    </div>
  );
};

export default Login;
