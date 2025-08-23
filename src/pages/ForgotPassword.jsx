import React, { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUser, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// ----------------------------------------------------
const Animation = lazy(() => import("../components/Animation"));
// ----------------------------------------------------

// Zod Schema
const loginSchema = z.object({
  username: z.string().nonempty("Email is required"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  // ------------------------------------------------------

  const {
    register: LoginUser,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // ------------------------------------------------------

  const handleUserLogin = (data) => {
    console.log("Form submitted with:", data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful!");
    }, 2000);
  };

  // ------------------------------------------------------

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-start lg:items-center justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <Animation />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center relative z-20">
          <div className="outline-4 outline-gray-200 rounded-full">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full"
              src="/logo.png"
              alt="Logo"
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 pt-8 sm:pt-12 shadow-2xl border border-white/16 relative -mt-6 sm:-mt-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-[1.3rem] sm:text-[2rem] font-bold text-white mb-4">
              Forgot Password
            </h1>
            <p className="text-gray-100 text-[10px] lg:text-sm sm:text-base">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleUserLogin)}
            className="space-y-5 sm:space-y-6"
          >
            {/* Username Field */}
            <div className="relative mb-8 sm:mb-10">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <CircleUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="Phone, username or email"
                className="w-full pl-10 sm:pl-12 py-3 sm:py-4  bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 placeholder:text-[11px] md:placeholder:text-[16px] focus:outline-none backdrop-blur-sm text-xs md:text-md sm:text-base focus:border-white/40 transition-colors"
                {...LoginUser("username")}
              />
              {errors.username && (
                <p className="text-red-400 text-[10px] sm:text-sm mt-1 pl-2 absolute -bottom-6 sm:-bottom-7">
                  {errors.username.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all text-sm sm:text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4  h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <span className="text-[11px] md:text-[16px]">
                  Send Reset Link
                </span>
              )}
            </button>

            <div className="text-center pt-2 sm:pt-4">
              <p className="text-gray-100 text-sm sm:text-lg font-medium">
                UDHHYOG CRM V1
              </p>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="text-gray-100 text-xs sm:text-sm transition-colors hover:text-white inline-flex items-center justify-center flex-wrap gap-1"
              >
                <ArrowLeft size={14} className="inline sm:w-4 sm:h-4" />
                <span className="text-yellow-400 text-[11px] md:text-[15px]">
                  Back to Login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
