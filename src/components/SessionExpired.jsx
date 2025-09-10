import { useEffect, useRef, useState } from "react";
import { clearSession, clearSessionExpire } from "../utils/StoreSessionInfo";

const SessionExpired = ({ sessionExpire, setIsSessionExpired }) => {
  const COUNTDOWN_SECONDS = 10;
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const [dismissed, setDismissed] = useState(false);
  const intervalRef = useRef(null);
  const loginBtnRef = useRef(null);

  // ----------------------------------------------------
  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // ----------------------------------------------------

  const goLogin = () => {
    clearTimer();
    clearSession();
    setIsSessionExpired(false);
    window.location.href = "/";
  };

  const continueSession = () => {
    if (timeLeft <= 0) return;
    clearTimer();
    clearSessionExpire();
    setIsSessionExpired(false);
    setDismissed(true);
  };

  // ----------------------------------------------------

  useEffect(() => {
    if (!sessionExpire) {
      clearTimer();
      document.body.classList.remove("overflow-hidden");
      return;
    }

    setDismissed(false);
    setTimeLeft(COUNTDOWN_SECONDS);
    document.body.classList.add("overflow-hidden");
    loginBtnRef.current?.focus();

    clearTimer();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          goLogin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimer();
      document.body.classList.remove("overflow-hidden");
    };
  }, [sessionExpire]);

  // -----------------------------------------------------

  if (!sessionExpire || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expire-title"
      aria-describedby="expire-desc"
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="relative flex w-full h-full items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/10 text-white ring-1 ring-white/10 shadow-2xl">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 ring-1 ring-red-500/30">
                <svg
                  className="h-7 w-7 text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0a9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <h2 id="expire-title" className="text-xl">
                  Session Expired
                </h2>
                <p id="expire-desc" className="mt-1 text-sm text-white/80">
                  Your session has expired. You can login again or continue to
                  try restoring your session
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                ref={loginBtnRef}
                onClick={goLogin}
                className="inline-flex items-center justify-center rounded-lg bg-yellow-400 text-black h-11 px-4 outline-none"
              >
                Login
              </button>

              <button
                onClick={continueSession}
                disabled={timeLeft <= 0}
                className={`inline-flex items-center justify-center rounded-lg h-11 px-4 focus:outline-none focus:ring-2 
                  ${
                    timeLeft > 0
                      ? "border border-white/20 bg-white/5 text-white hover:bg-white/10 focus:ring-white/40"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Continue {timeLeft > 0 && `(${timeLeft})`}
              </button>
            </div>

            <p className="mt-4 text-xs text-white/60">
              If you don’t act within {COUNTDOWN_SECONDS} seconds, you will be
              redirected to login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SessionExpired;
