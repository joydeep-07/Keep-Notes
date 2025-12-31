import React, { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiUser,
  FiAlertCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../components/AuthImagePattern";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setAuthError("");
    setIsLoading(true);

    try {
      // 🔹 Replace with real API call later
      console.log("Register data:", data);

      reset();
      navigate("/user-login");
    } catch (error) {
      setAuthError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-24 mb-10 flex items-center justify-center p-4">
      <div className="w-full max-w-[1550px] bg-white rounded-xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FiMessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl font-bold mt-2 text-gray-800">
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Join our community to get started
                </p>
              </div>
            </div>

            {authError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                <FiAlertCircle className="mr-2" />
                {authError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    className={`w-full pl-10 py-2 border-b ${
                      errors.fullname ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500`}
                    placeholder="Enter your full name"
                    {...register("fullname", {
                      required: "Full Name is required",
                    })}
                  />
                </div>
                {errors.fullname && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="email"
                    className={`w-full pl-10 py-2 border-b ${
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
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-2 border-b ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500`}
                    placeholder="Create password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-2 border-b ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500`}
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords must match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 font-medium">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <AuthImagePattern
          title="Already a Member?"
          subtitle="Sign in to manage your appointments and health records."
        />
      </div>
    </div>
  );
};

export default Register;
