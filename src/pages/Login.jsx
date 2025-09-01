import React, { lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, ArrowRight, CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/auth/authSlice";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import { getToken, setToken } from "../utils/StoreSessionInfo";

// -------------------------------------------------------

const Animation = lazy(() => import("../components/Animation"));
// -------------------------------------------------------

// Zod Schema
const loginSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ------------------------------------------------------

  // If already logged in, take to dashboard
  useEffect(() => {
    if (getToken()) navigate("/dashboard", { replace: true });
  }, [navigate]);

  // ------------------------------------------------------

  const {
    register: LoginUser,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // ------------------------------------------------------

  const [login, { isLoading }] = useLoginUserMutation();
  const handleUserLogin = async (data) => {
    const result = await fetchWithErrorHandling(() => login(data).unwrap());
    if (result.success) {
      const { token } = result?.data || {};
      setToken(token);
      navigate("/dashboard", { replace: true });
    } else {
      console.log("Fetch failed:");
    }
  };

  // ------------------------------------------------------

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-start lg:items-start justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-60">
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
          <div className="text-center mb-6 sm:mb-6">
            <h1 className="text-gray-100 text-[1.3rem] sm:text-[2rem] font-bold">
              UDHHYOG CRM V1
            </h1>
            <p className="text-gray-100 text-[0.8rem] sm:text-base mt-2">
              Log in to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleUserLogin)}
            className="space-y-5 sm:space-y-6"
          >
            <div className="relative mb-8 sm:mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <CircleUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="Email"
                className="w-full pl-10 sm:pl-12 py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm text-sm sm:text-base focus:border-white/40 transition-colors"
                {...LoginUser("email")}
              />
              {errors.email && (
                <p className="text-red-400 text-xs sm:text-sm mt-1 pl-2 absolute -bottom-6 sm:-bottom-7">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm text-sm sm:text-base focus:border-white/40 transition-colors ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...LoginUser("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
              {errors.password && (
                <p className="absolute text-red-400 text-xs sm:text-sm mt-1 pl-2 -bottom-6 sm:-bottom-7">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex mb-3 mt-0 items-end justify-end text-xs sm:text-sm">
              <Link
                to="/reset-password"
                className="text-gray-100 hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all text-sm sm:text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Log In"
              )}
            </button>

            <div className="text-center">
              <Link
                to="/"
                className="text-gray-100 text-xs sm:text-sm transition-colors hover:text-white inline-flex items-center justify-center flex-wrap gap-1"
              >
                <span className="break-words">
                  Udhhyog - One Stop Shop for All Industrial Needs
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
