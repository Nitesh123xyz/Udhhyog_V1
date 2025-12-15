import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import { showCustomToast } from "../components/CustomToast";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../utils/Utils";
import { useReVerifySessionMutation } from "../features/utils/utilsSlice";
import useAuth from "../hooks/useAuth";

const VerificationSchema = z.object({
  authcode: z
    .string()
    .min(6, "Please enter the complete code.")
    .regex(/^\d{6}$/, "Authentication code must be numeric"),
});

const ReVerifySession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useAuth();
  const {
    register: TwoFactorAuthentication,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { isValid },
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

  const [ReLoginAuthentication, { isLoading }] = useReVerifySessionMutation();
  const btnDisabled = isLoading || !isValid;
  const handleUserLogin = async (data) => {
    const { success, status, ApiData } = await fetchWithErrorHandling(() =>
      ReLoginAuthentication({
        token: token,
        totp: data.authcode,
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
    const paste = e.clipboardData.getData("text").slice(0, 6);
    handlePasteAt(paste.replace(/\D/g, ""));
  };

  const handlePasteAt = (text) => {
    const chars = text.split("");
    const next = [...inputBox];
    for (let i = 0, j = 0; i < 6 && j < chars.length; i++, j++) {
      next[i] = chars[j];
    }
    setInputBox(next);
    syncAuthCode(next);

    const firstEmpty = next.findIndex((c) => c === "");
    const focusIndex = firstEmpty === -1 ? 5 : firstEmpty;
    inputsRef.current[Math.min(focusIndex, 5)]?.focus();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--background)] flex items-start lg:items-start justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8 rounded-lg">
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

        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 pt-8 sm:pt-12 shadow-2xl border border-[var(--border)] relative -mt-6 sm:-mt-8">
          <div className="text-center mb-5 sm:mb-5">
            <h1 className="text-[var(--text)] text-[1.3rem] sm:text-[2rem] font-bold">
              UDHHYOG CRM V1
            </h1>
            <p className="text-[var(--text)]">Re - Authenticate</p>
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
                  autoComplete="one-time-code"
                  className="w-full h-10 sm:h-12 text-center text-[var(--text)] border border-[var(--border)] rounded-lg focus:outline-none backdrop-blur-sm text-sm sm:text-base"
                />
              ))}
            </div>

            <button
              id="submit-2fa"
              type="submit"
              disabled={btnDisabled}
              className={`cursor-pointer w-full py-3 sm:py-3 border rounded-lg text-sm sm:text-base font-medium transition-all
          ${
            btnDisabled
              ? "border-[var(--border)] text-gray-500 cursor-none"
              : "bg-white/10 border-[var(--border)] text-[var(--text)]"
          }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReVerifySession;
