import React, { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import { showCustomToast } from "../components/CustomToast";

const Animation = lazy(() => import("../components/Animation"));

// ---------------- Zod Schema ----------------
const PasswordChangeSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/\d/, "Must include at least one number")
      .regex(/[^\w\s]/, "Must include at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords not matching",
  });

const ChangePassword = ({ sharing_otp }) => {
  const [showPassword, setShowPassword] = useState({
    input1: false, // password
    input2: false, // confirm password
  });

  const navigate = useNavigate();

  const {
    register: ResetPassword,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(PasswordChangeSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const pwd = watch("password", "");
  const confirmPwd = watch("confirmPassword", "");
  const passwordsMatch = !!confirmPwd && pwd === confirmPwd;

  // Strength + requirements (based on password only)
  const requirements = [
    {
      id: "len",
      label: "8–20 characters",
      test: pwd.length >= 8 && pwd.length <= 20,
    },
    { id: "upper", label: "1 uppercase (A–Z)", test: /[A-Z]/.test(pwd) },
    { id: "num", label: "1 number (0–9)", test: /\d/.test(pwd) },
    {
      id: "spec",
      label: "1 special character (!@#$…)",
      test: /[^\w\s]/.test(pwd),
    },
  ];
  const passedCount = requirements.filter((r) => r.test).length;
  const allPassed = passedCount === requirements.length;
  const strengthPct = Math.round((passedCount / requirements.length) * 100);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordReset = async (data) => {
    if (!sharing_otp) {
      toast.error("OTP is missing. Please try again.");
      return;
    }

    const { success, status } = await fetchWithErrorHandling(() =>
      changePassword({
        ...data, // { password, confirmPassword }
        otp: sharing_otp,
      }).unwrap()
    );

    if (success) {
      showCustomToast(
        "Password Changed Successfully",
        "/success.gif",
        "Success"
      );
      navigate("/", { replace: true });
    } else if (status === 401) {
      showCustomToast(
        "OTP Expired or Invalid. Please refresh the page",
        "/error.gif",
        "Error"
      );
    }
  };

  const canSubmit =
    isValid && !isSubmitting && !isLoading && allPassed && passwordsMatch;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-start lg:items-start justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-60">
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
            {/* Password (Line 1) */}
            <div className="relative">
              <div className="absolute top-0 translate-y-[90%] left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>

              <input
                type={showPassword.input1 ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"
                className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm text-sm sm:text-base focus:border-white/40 transition-colors ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...ResetPassword("password")}
                aria-describedby="password-help requirements"
              />

              {passwordsMatch ? (
                <span
                  className="absolute top-0 translate-y-[100%] right-0 pr-3 sm:pr-4 flex items-center text-green-400"
                  aria-label="Passwords match"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((pre) => ({ ...pre, input1: !pre.input1 }))
                  }
                  className="absolute top-0 translate-y-[100%] right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  aria-label={
                    showPassword.input1
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showPassword.input1 ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              )}

              {/* Inline error */}
              {errors.password && (
                <p className="absolute text-red-400 text-xs sm:text-sm inset-auto">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password (Line 2) */}
            <div className="relative">
              <div className="absolute top-0 translate-y-[90%] left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>

              <input
                type={showPassword.input2 ? "text" : "password"}
                placeholder="Confirm password"
                autoComplete="new-password"
                className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm text-sm sm:text-base focus:border-white/40 transition-colors ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                {...ResetPassword("confirmPassword")}
                aria-describedby="confirm-password-help"
              />

              {/* Right-side icon logic for Confirm:
                  - If passwords match: show green check, no toggle.
                  - Else: show Eye/EyeOff toggle.
              */}
              {passwordsMatch ? (
                <span
                  className="absolute top-0 translate-y-[100%] right-0 pr-3 sm:pr-4 flex items-center text-green-400"
                  aria-label="Passwords match"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((pre) => ({ ...pre, input2: !pre.input2 }))
                  }
                  className="absolute top-0 translate-y-[100%] right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  aria-label={
                    showPassword.input2
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showPassword.input2 ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              )}

              {/* Inline error for confirm */}
              {errors.confirmPassword && (
                <p className="absolute text-red-400 text-xs sm:text-sm inset-auto">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Strength + Checklist (Below both fields) */}
            <div className="space-y-3">
              {/* Strength bar */}
              <div>
                <div
                  className={`w-full rounded-full transition-all duration-300 ${
                    allPassed ? "h-2 bg-green-500/30" : "h-1.5 bg-white/10"
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      allPassed ? "bg-green-500" : "bg-white/30"
                    }`}
                    style={{ width: `${strengthPct}%` }}
                    aria-hidden
                  />
                </div>

                {/* Strength badge */}
                <div className="mt-2 flex items-center gap-2">
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      allPassed ? "text-green-400" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      allPassed ? "text-green-400" : "text-gray-300"
                    }`}
                  >
                    Strength: {strengthPct}%
                  </span>
                </div>
              </div>

              {/* Requirement checklist */}
              <ul
                id="requirements"
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4"
                aria-live="polite"
              >
                {requirements.map((r) => (
                  <li key={r.id} className="flex items-center gap-2">
                    {r.test ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`text-xs ${
                        r.test ? "text-green-300" : "text-gray-300"
                      }`}
                    >
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl text-white backdrop-blur-sm text-sm sm:text-base font-medium transition-all
              ${
                !canSubmit
                  ? "bg-white/5 border border-white/10 cursor-not-allowed opacity-60"
                  : "bg-white/1 border border-white/20 hover:bg-white/10 hover:border-white/30"
              }`}
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
