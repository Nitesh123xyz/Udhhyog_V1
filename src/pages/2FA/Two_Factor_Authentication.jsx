import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTwoFactorAuthenticationMutation } from "../../features/auth/authSlice";
import { fetchWithErrorHandling } from "../../utils/ApiResponse";
import { setToken } from "../../utils/StoreSessionInfo";
import { showCustomToast } from "../../components/CustomToast";
import { QRCodeSVG } from "qrcode.react";
import Animation from "../../components/Animation";

const VerificationSchema = z.object({
  authcode: z
    .string()
    .min(6, "Please enter the complete code.")
    .regex(/^\d{6}$/, "Authentication code must be numeric"),
});

const Two_Factor_Authentication = () => {
  const navigate = useNavigate();

  const {
    register: TwoFactorAuthentication,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(VerificationSchema),
    defaultValues: { authcode: "" },
    mode: "onSubmit",
  });

  const [loginTwoFactorAuthentication, { isLoading }] =
    useTwoFactorAuthenticationMutation();

  const [inputBox, setInputBox] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  inputsRef.current = Array.from(
    { length: 6 },
    (_, i) => inputsRef.current[i] ?? React.createRef()
  );

  const handleUserLogin = async (data) => {
    const { success, status, ApiData } = await fetchWithErrorHandling(() =>
      loginTwoFactorAuthentication({ authcode: data.authcode }).unwrap()
    );
    if (success && status === 200) {
      const { token } = ApiData || {};
      if (token) {
        setToken(token);
        navigate("/dashboard", { replace: true });
      }
    } else {
      if (status === 401) {
        showCustomToast("Invalid Credentials", "/error.gif", "Error");
      } else {
        showCustomToast("Login failed", "/error.gif", "Error");
      }
    }
  };

  const syncAuthCode = (arr) => {
    const joined = Array.isArray(arr) ? arr.join("") : inputBox.join("");
    setValue("authcode", joined, { shouldValidate: true });
    if (joined.length === 6) clearErrors("authcode");
  };

  const updateAt = (idx, value) => {
    const next = [...inputBox];
    next[idx] = value.slice(0, 1);
    setInputBox(next);
    syncAuthCode(next);
  };

  const onChangeInput = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      const next = [...inputBox];
      next[idx] = "";
      setInputBox(next);
      syncAuthCode(next);
      return;
    }

    if (val.length > 1) {
      handlePasteAt(val.replace(/\D/g, ""), idx);
      return;
    }

    updateAt(idx, val);
    if (idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (inputBox[idx] === "") {
        if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
          updateAt(idx - 1, "");
        }
      } else {
        updateAt(idx, "");
      }
    } else if (e.key === "ArrowLeft") {
      if (idx > 0) inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      if (idx < 5) inputsRef.current[idx + 1]?.focus();
    } else if (e.key === "Enter") {
      if (idx === 5) {
        handleSubmit(handleOTPVerification)();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    handlePasteAt(paste.replace(/\D/g, ""), 0);
  };

  const handlePasteAt = (text, startIdx) => {
    const chars = text.split("");
    const next = [...inputBox];
    for (let i = startIdx, j = 0; i < 6 && j < chars.length; i++, j++) {
      next[i] = chars[j];
    }

    setInputBox(next);
    const joined = next.join("");
    syncAuthCode(next);

    const firstEmpty = next.findIndex((c) => c === "");
    const focusIndex = firstEmpty === -1 ? 5 : firstEmpty;
    inputsRef.current[Math.min(focusIndex, 5)]?.focus();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-start lg:items-start justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8">
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
          <div className="text-center mb-5 sm:mb-5">
            <h1 className="text-gray-100 text-[1.3rem] sm:text-[2rem] font-bold">
              UDHHYOG CRM V1
            </h1>
            <div className="flex justify-center mt-2">
              <div className="bg-white p-2 rounded-lg shadow-lg hover:scale-110 transition-scale duration-300 cursor-pointer">
                <QRCodeSVG
                  value={"https://udhhyog.com/"}
                  size={150}
                  bgColor="#fff"
                  fgColor="#000"
                  level="H"
                />
              </div>
            </div>
            <p className="text-gray-100 text-[0.8rem] sm:text-[0.9rem] my-3">
              Scan QR Code to Login
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleUserLogin)}
            className="space-y-5 sm:space-y-3"
          >
            <input {...TwoFactorAuthentication("authcode")} type="hidden" />

            <div className="flex justify-center gap-2 mb-3">
              {inputBox.map((value, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  value={value}
                  onChange={(e) => onChangeInput(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  autoComplete="one-time-code"
                  className="w-full h-10 sm:h-12 text-center bg-white/1 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm text-sm sm:text-base"
                />
              ))}
            </div>

            {errors.authcode && (
              <p className="text-red-400 text-md text-center">
                {errors.authcode.message}
              </p>
            )}

            <button
              id="submit-2fa"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-3 bg-white/1 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all text-sm sm:text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify"
              )}
            </button>

            <div className="text-center">
              <a className="text-gray-100 text-xs sm:text-sm transition-colors hover:text-white inline-flex items-center justify-center flex-wrap gap-1">
                <span className="break-words">
                  Udhhyog - One Stop Shop for All Industrial Needs
                </span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Two_Factor_Authentication;
