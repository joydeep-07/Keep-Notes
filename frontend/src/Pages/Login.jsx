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
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-7xl overflow-hidden lg:grid lg:grid-cols-2 bg-[var(--bg-secondary)] rounded-2xl ">
        {/* Left Side - Login Form */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--bg-gradient)] flex items-center justify-center shadow-lg border border-[var(--border-light)]">
                  <FiMessageSquare className="w-7 h-7 text-[var(--accent-primary)]" />
                </div>
                <h1 className="text-2xl font-bold mt-2 text-[var(--text-main)]">
                  Welcome Back!
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  Sign in to your account
                </p>
              </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center shadow-sm">
                <FiAlertCircle className="mr-3 text-red-600" />
                <span className="text-sm text-amber-800">{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiMail className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                  </div>
                  <input
                    type="email"
                    className={`w-full pl-12 pr-4 py-3 text-sm bg-transparent border-b-2 focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-amber-500 focus:border-red-600"
                        : "border-[var(--border-light)] focus:border-[var(--accent-primary)]"
                    }`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiLock className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-3 text-sm bg-transparent border-b-2 focus:outline-none transition-all duration-300 ${
                      errors.password
                        ? "border-red-500 focus:border-red-600"
                        : "border-[var(--border-light)] focus:border-[var(--accent-primary)]"
                    }`}
                    placeholder="Enter your password"
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
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
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative overflow-hidden group flex items-center justify-center py-2 px-4 text-sm font-medium bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center">
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-3" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-[var(--border-light)]">
                <span className="text-sm text-[var(--text-secondary)]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                  >
                    Create Account
                  </Link>
                </span>
              </div>
              {/* <Link
                to="/forgot-password"
                className="text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
              >
                Forgot Password?
              </Link> */}
            </form>
          </div>
        </div>

        {/* Right Side - Pattern */}
        <div className="hidden lg:block">
          <AuthImagePattern
            title="New Here?"
            subtitle="Join our community and experience seamless connection with our platform."
            accentColor="var(--accent-primary)"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
