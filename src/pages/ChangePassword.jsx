import React, { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Footprints, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../features/auth/authSlice";
// -------------------------------------------------------

const Animation = lazy(() => import("../components/Animation"));
// -------------------------------------------------------

// Zod Schema
const PasswordChangeSchema = z.object({
  password: z.string().nonempty("Password is required"),
  // confirm_password: z.string().nonempty("Confirm Password is required"),
});

const ChangePassword = ({ sharing_otp }) => {
  const [showPassword, setShowPassword] = useState({
    input1: false,
    input2: false,
  });

  const navigate = useNavigate();

  // ------------------------------------------------------

  const {
    register: ResetPassword,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PasswordChangeSchema),
  });

  // ------------------------------------------------------

  const [ChangePassword, { isLoading, isError, error }] =
    useChangePasswordMutation();
  const handlePasswordReset = async (data) => {
    try {
      const response = await ChangePassword({
        ...data,
        otp: sharing_otp,
      });
      // console.log(response);
      // console.log(response.ok);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      // console.error(err);
      // toast.error(err?.data?.status);
    }
  };

  // ------------------------------------------------------

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-start lg:items-start justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <Animation />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
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
          <div className="text-center mb-6 sm:mb-6">
            <h1 className="text-gray-100 text-[1.3rem] sm:text-[2rem] font-bold">
              UDHHYOG CRM V1
            </h1>
            <p className="text-gray-100 text-[0.8rem] sm:text-base mt-2">
              Reset your password <br />
              <span className="text-[0.7rem] sm:text-xs">
                Don't Refresh the Page
              </span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handlePasswordReset)}
            className="space-y-5 sm:space-y-6"
          >
            <div className="relative mb-10">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>

              <input
                type={showPassword.input1 ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm text-sm sm:text-base focus:border-white/40 transition-colors ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...ResetPassword("password")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((pre) => ({ ...pre, input1: !pre.input1 }))
                }
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword.input1 ? (
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

            {/* <div className="relative mb-10">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>

              <input
                type={showPassword.input2 ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="off"
                className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm text-sm sm:text-base focus:border-white/40 transition-colors ${
                  errors.confirm_password ? "border-red-500" : ""
                }`}
                {...ResetPassword("confirm_password")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((pre) => ({ ...pre, input2: !pre.input2 }))
                }
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword.input2 ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
              {errors.confirm_password && (
                <p className="absolute text-red-400 text-xs sm:text-sm mt-1 pl-2 -bottom-6 sm:-bottom-7">
                  {errors.confirm_password.message}
                </p>
              )}
            </div> */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all text-sm sm:text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Reset...
                </div>
              ) : (
                "Reset Password"
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

export default ChangePassword;
