import React, { lazy } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUser, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/authSlice";
import { fetchWithErrorHandling } from "../../utils/ApiResponse";
import { showCustomToast } from "../../components/CustomToast";

// ----------------------------------------------------
const Animation = lazy(() => import("../../components/Animation"));
// ----------------------------------------------------

// Zod Schema
const ForgotSchema = z.object({
  email: z.string().nonempty("Email is required"),
});

const ForgotPassword = ({ setStep }) => {
  // ------------------------------------------------------

  const {
    register: ForgotUserPassword,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(ForgotSchema),
  });

  // ------------------------------------------------------

  const [ForgotPasswordRequest, { isLoading }] = useForgotPasswordMutation();
  const btnDisabled = isLoading || !isValid;
  const handlePasswordReset = async (data) => {
    sessionStorage.setItem("tempEmail", data.email);
    const { success, status } = await fetchWithErrorHandling(() =>
      ForgotPasswordRequest(data).unwrap()
    );
    if (success) {
      showCustomToast(
        "OTP Sent Successfully, Please check your email",
        "/success.gif",
        "Success"
      );
      setStep(2);
    } else {
      if (status === 401) {
        showCustomToast("Invalid Email Address", "/error.gif", "Error");
      }
    }
  };

  // ------------------------------------------------------

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-start lg:items-start justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-80">
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
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-[1.3rem] sm:text-[2rem] font-bold text-gray-600 mb-3">
              UDHHYOG CRM V1
            </h1>
            <p className="text-gray-500 max-w-[12rem] md:max-w-[16rem] mx-auto text-[10px] md:text-sm sm:text-base capitalize">
              Forgot your password Please enter your email address
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handlePasswordReset)}
            className="space-y-5 sm:space-y-6"
          >
            <div className="relative mb-8 sm:mb-10">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <CircleUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="Email"
                className="w-full pl-10 sm:pl-12 py-3 sm:py-4  bg-white/1 border border-white/20 rounded-lg sm:rounded-xl placeholder-gray-500 placeholder:text-[11px] md:placeholder:text-[16px] focus:outline-none backdrop-blur-sm text-xs md:text-md sm:text-base focus:border-white/40 transition-colors"
                {...ForgotUserPassword("email")}
              />
            </div>

            <button
              type="submit"
              disabled={btnDisabled}
              className={`w-full py-3 sm:py-4 border rounded-lg sm:rounded-xl transition-all text-sm sm:text-base 
              ${
                btnDisabled
                  ? "bg-white/5 border-white/10 text-gray-400 cursor-not-allowed"
                  : "bg-white/10 border-white/30 text-gray-600 hover:bg-white/20 hover:border-white/40 cursor-pointer"
              }
             `}
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

            <div className="text-center">
              <Link
                to="/"
                className="text-gray-500 text-xs sm:text-sm transition-colors hover:text-gray-800 inline-flex items-center justify-center flex-wrap gap-1"
              >
                <ArrowLeft size={14} className="inline sm:w-4 sm:h-4" />
                <span className="text-[11px] md:text-[15px]">
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
