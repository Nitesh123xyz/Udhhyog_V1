import { lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useOTPVerificationMutation } from "../../features/auth/authSlice";
import { fetchWithErrorHandling } from "../../utils/ApiResponse";
import { showCustomToast } from "../../components/CustomToast";

const Animation = lazy(() => import("../../components/Animation"));

const Otp = ({ setStep, setSharingOtp }) => {
  const [otpInput, setOtpInput] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [time, setTime] = useState(60);
  const intervalRef = useRef(null);

  const {
    register: OtpVerify,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
  });

  const syncOtpString = (arr) => {
    const joined = arr.join("");
    setValue("otp", joined, { shouldValidate: true });
    if (joined.length === 6) clearErrors("otp");
  };

  const handleChange = (index) => (event) => {
    const raw = event.target.value;
    const value = raw.replace(/\D/g, "").slice(0, 1);

    const next = [...otpInput];
    next[index] = value;
    setOtpInput(next);
    syncOtpString(next);

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...otpInput];

      if (next[index]) {
        next[index] = "";
        setOtpInput(next);
        syncOtpString(next);
        return;
      }

      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
        next[index - 1] = "";
        setOtpInput(next);
        syncOtpString(next);
      }
    } else if (event.key === "ArrowLeft") {
      if (index > 0) inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowRight") {
      if (index < 5) inputRefs.current[index + 1].focus();
    } else if (event.key === "Enter") {
      if (index === 5) handleSubmit(handleOTPVerification)();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasteData) return;

    const next = [...otpInput];
    for (let i = 0; i < next.length; i++) {
      next[i] = pasteData[i] || "";
    }
    setOtpInput(next);
    syncOtpString(next);

    const lastIndex = Math.min(pasteData.length, next.length) - 1;
    if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };

  const [OTPVerification, { isLoading, isError, error }] =
    useOTPVerificationMutation();
  const handleOTPVerification = async (data) => {
    if (!data.otp || data.otp.length !== 6) return;

    const { success, status } = await fetchWithErrorHandling(() =>
      OTPVerification(data).unwrap()
    );

    if (success) {
      showCustomToast("OTP Verified Successfully", "/success.gif", "Success");
      setSharingOtp(data.otp);
      setStep(3);
    } else {
      if (status === 401) {
        showCustomToast("Invalid OTP Try Again", "/error.gif", "Error");
      }
    }
  };

  // --------------------------------------------------------

  useEffect(() => {
    if (time <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // ------------------------------------------------------

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // --------------------------------------------------------

  return (
    <>
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
                OTP Verification
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleOTPVerification)}
              className="space-y-5"
            >
              <input
                type="hidden"
                {...OtpVerify("otp", {
                  validate: (v) =>
                    v && v.length === 6
                      ? true
                      : "Please enter the complete OTP.",
                })}
              />

              <div className="flex gap-2 sm:gap-4 justify-center items-center">
                {otpInput?.map((val, index) => (
                  <input
                    key={index}
                    type="text"
                    value={val}
                    maxLength={1}
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    pattern="\d*"
                    onChange={handleChange(index)}
                    onKeyDown={handleKeyDown(index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    ref={(el) => (inputRefs.current[index] = el)}
                    autoFocus={index === 0}
                    className="w-[2rem] flex-1 sm:w-[3rem] px-0.5 py-2 sm:px-3 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white text-center text-base focus:outline-none backdrop-blur-sm focus:border-white/40"
                    aria-label={`OTP Digit ${index + 1}`}
                  />
                ))}
              </div>

              <div className="text-red-400 flex  my-5">
                {errors.otp && <span>{errors.otp.message}</span>}
                {time > 0 ? (
                  <span className="ml-auto">{formattedTime}</span>
                ) : (
                  <span
                    onClick={() => setTime(60)}
                    className="ml-auto cursor-pointer"
                  >
                    Send OTP
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify"
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-gray-100 text-xs sm:text-sm hover:text-white inline-flex items-center gap-1"
                >
                  Udhhyog - One Stop Shop for All Industrial Needs
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
