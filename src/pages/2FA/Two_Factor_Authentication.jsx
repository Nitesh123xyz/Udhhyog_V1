import React, { lazy, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTwoFactorAuthenticationMutation } from "../../features/auth/authSlice";
import { fetchWithErrorHandling } from "../../utils/ApiResponse";
import { showCustomToast } from "../../components/CustomToast";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../utils/Utils";

const Animation = lazy(() => import("../../components/Animation"));

const VerificationSchema = z.object({
  authcode: z
    .string()
    .min(6, "Please enter the complete code.")
    .regex(/^\d{6}$/, "Authentication code must be numeric"),
});

const Two_Factor_Authentication = ({ authData }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const {
    register: TwoFactorAuthentication,
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(VerificationSchema),
    defaultValues: { authcode: "" },
    mode: "onSubmit",
  });

  const [inputBox, setInputBox] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  inputsRef.current = Array.from(
    { length: 6 },
    (_, i) => inputsRef.current[i] ?? React.createRef()
  );
  const allFilled = inputBox.every(Boolean);

  const [loginTwoFactorAuthentication, { isLoading }] =
    useTwoFactorAuthenticationMutation();

  const handleUserLogin = async (data) => {
    const { success, status, ApiData } = await fetchWithErrorHandling(() =>
      loginTwoFactorAuthentication({
        totp: data.authcode,
        email: authData.email,
      }).unwrap()
    );
    if (success && status === 200) {
      const { token } = ApiData || {};
      if (token) {
        dispatch(setAccessToken(token));
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
        handleSubmit(handleUserLogin)();
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

  const handleCopy = () => {
    const joined = authData?.twofa_secret;
    console.log(joined);
    navigator.clipboard.writeText(joined);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 600);
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
            {!authData?.twofa_url && (
              <p className="text-gray-100 text-[1rem] my-3">
                ! Enter Code to Authenticate
              </p>
            )}
            {authData?.twofa_url && (
              <>
                <div className="flex justify-center mt-2">
                  <div className="bg-white p-2 rounded-lg shadow-lg hover:scale-110 transition-scale duration-300 cursor-pointer">
                    <QRCodeSVG
                      value={authData?.twofa_url}
                      size={150}
                      bgColor="#fff"
                      fgColor="#000"
                      level="H"
                    />
                  </div>
                </div>
                <p className="text-gray-100 text-[0.8rem] sm:text-[0.9rem] my-3">
                  Scan QR Code to Authenticate
                </p>

                <div className="text-gray-100 text-[0.7rem] my-3 flex justify-center items-center gap-2">
                  <div>
                    <span className="font-medium text-[0.8rem] mr-0.5">
                      Secret Key :{" "}
                    </span>

                    <span className="relative inline-block">
                      {authData?.twofa_secret
                        ?.replace(/(.{5})/g, "$1    ")
                        .trim()}
                      <span className="w-full h-[1px] bottom-[-3px] block absolute bg-[var(--border)]" />
                    </span>
                  </div>
                  {copied ? (
                    <Check className="animate__animated animate__bounceOut text-white" />
                  ) : (
                    <Copy
                      className="cursor-pointer text-white"
                      onClick={handleCopy}
                    />
                  )}
                </div>
              </>
            )}
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

            <button
              id="submit-2fa"
              type="submit"
              disabled={isLoading || !allFilled}
              className={`w-full py-3 sm:py-3 border rounded-lg text-sm sm:text-base font-medium transition-all
          ${
            isLoading || !allFilled
              ? "bg-white/5 border-white/10 text-gray-400 cursor-not-allowed"
              : "bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40"
          }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Submit"
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
