import { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getSessionExpire } from "../utils/StoreSessionInfo";

const Animation = lazy(() => import("../components/Animation"));
// -------------------------------------------------------

const SessionExpired = () => {
  const navigate = useNavigate();
  const Expire = getSessionExpire();
  console.log(Expire);
  useEffect(() => {
    // if (!Expire) navigate("/", { replace: true });
    if (!Expire) {
      console.log("no expire");
    }
  }, [Expire, navigate]);

  // if (!Expire) return null;

  // ------------------------------------------------------

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-start lg:items-start justify-center px-4 md:py-[1rem] py-[4rem] sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-60">
        <Animation />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
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
            <h2 className="text-gray-100 text-[1.3rem] sm:text-[1.8rem] font-bold text-left mt-5">
              Session Expired
            </h2>
            <p className="text-gray-100 text-[0.8rem] sm:text-base mt-2 text-left">
              Your session has ended for security reasons. Please log in again
              to continue.
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/", { replace: true }, clearSession());
            }}
            type="submit"
            className="w-full py-3 sm:py-4 bg-white/1 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-300 focus:outline-none backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all text-sm sm:text-base font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
