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
  FiCheck,
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
  const [passwordStrength, setPasswordStrength] = useState(0);

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
  const confirmPassword = watch("confirmPassword");

  // Calculate password strength
  const calculatePasswordStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 6) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const onSubmit = async (data) => {
    setAuthError("");
    setIsLoading(true);

    try {
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
    <div className="min-h-screen flex items-center justify-center px-auto">
      <div className="w-full max-w-7xl overflow-hidden lg:grid lg:grid-cols-2 bg-[var(--bg-secondary)] rounded-2xl ">
        {/* Left Side - Registration Form */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--bg-gradient)] flex items-center justify-center shadow-lg border border-[var(--border-light)]">
                  <FiMessageSquare className="w-7 h-7 text-[var(--accent-primary)]" />
                </div>
                <h1 className="text-2xl font-bold mt-2 text-[var(--text-main)]">
                  Create Your Account
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  Join our community to get started
                </p>
              </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200  flex items-center shadow-sm">
                <FiAlertCircle className="mr-3 text-red-600" />
                <span className="text-sm text-amber-800">{authError}</span>
              </div>
            )}

            {/* Registration Form */}
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiUser className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                  </div>
                  <input
                    type="text"
                    className={`w-full pl-12 pr-4 py-3 text-sm bg-transparent border-b-2  focus:outline-none transition-all duration-300 ${
                      errors.fullname
                        ? "border-red-600 focus:border-red-600"
                        : "border-[var(--border-light)] focus:border-[var(--accent-primary)]"
                    }`}
                    placeholder="Enter your full name"
                    {...register("fullname", {
                      required: "Full Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                </div>
                {errors.fullname && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiMail className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                  </div>
                  <input
                    type="email"
                    className={`w-full pl-12 pr-4 py-3 text-sm bg-transparent border-b-2  focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-red-600 focus:border-red-600"
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
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Create Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiLock className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-3 text-sm bg-transparent border-b-2  focus:outline-none transition-all duration-300 ${
                      errors.password
                        ? "border-red-600 focus:border-red-600"
                        : "border-[var(--border-light)] focus:border-[var(--accent-primary)]"
                    }`}
                    placeholder="Create a strong password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      onChange: (e) =>
                        setPasswordStrength(
                          calculatePasswordStrength(e.target.value)
                        ),
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

                {/* Password Strength Meter */}
                {password && password.length > 0 && (
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">
                        Password strength
                      </span>
                      <span
                        className={`font-medium ${
                          passwordStrength < 50
                            ? "text-red-600"
                            : passwordStrength < 75
                            ? "text-orange-500"
                            : "text-emerald-500"
                        }`}
                      >
                        {passwordStrength < 50
                          ? "Weak"
                          : passwordStrength < 75
                          ? "Medium"
                          : "Strong"}
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength < 50
                            ? "bg-amber-400"
                            : passwordStrength < 75
                            ? "bg-orange-400"
                            : "bg-emerald-400"
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiLock className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-3 text-sm bg-transparent border-b-2  focus:outline-none transition-all duration-300 ${
                      errors.confirmPassword
                        ? "border-red-600 focus:border-red-600"
                        : "border-[var(--border-light)] focus:border-[var(--accent-primary)]"
                    }`}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="text-sm" />
                    ) : (
                      <FiEye className="text-sm" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && confirmPassword.length > 0 && (
                  <div
                    className={`flex items-center text-xs mt-2 ${
                      confirmPassword === password
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {confirmPassword === password ? (
                      <>
                        <FiCheck className="mr-1.5" />
                        <span>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <FiAlertCircle className="mr-1.5" />
                        <span>Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}

                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative rounded-lg overflow-hidden group flex items-center justify-center py-2 px-4 text-sm font-medium bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center">
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-3" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FiCheck className="mr-2" />
                        Create Account
                      </>
                    )}
                  </span>
                 
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-[var(--border-light)]">
                <span className="text-sm text-[var(--text-secondary)]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                  >
                    Sign In
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Pattern */}
        <div className="hidden lg:block">
          <AuthImagePattern
            title="Already a Member?"
            subtitle="Sign in to manage your appointments and health records."
            accentColor="var(--accent-primary)"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
