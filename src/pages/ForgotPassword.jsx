import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

// Simple animation component since we can't import the external Animation component
const SimpleAnimation = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-10 left-10 w-16 h-16 border-2 border-purple-500/20 rounded-full animate-spin"></div>
      <div className="absolute top-32 right-20 w-8 h-8 border-2 border-blue-500/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-pink-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-6 h-6 border-2 border-green-500/20 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-10 h-10 border-2 border-yellow-500/20 rounded-full animate-spin"></div>
      <div className="absolute top-1/3 right-1/3 w-14 h-14 border-2 border-indigo-500/20 rounded-full animate-pulse"></div>
    </div>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    // In a real app, this would navigate back to login
    window.history.back();
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center p-4">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <SimpleAnimation />
        </div>

        {/* Success Card */}
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/5 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-white mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-300 mb-2">
              We've sent a password reset link to:
            </p>
            <p className="text-purple-400 font-medium mb-6">{email}</p>
            <p className="text-gray-400 text-sm mb-8">
              Click the link in the email to reset your password. If you don't
              see it, check your spam folder.
            </p>

            {/* Back to Login Button */}
            <button
              onClick={handleBackToLogin}
              className="w-full py-4 border border-white/20 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
            >
              Back to Login
            </button>

            {/* Resend Email */}
            <button
              onClick={() => setIsEmailSent(false)}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Didn't receive an email? Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <SimpleAnimation />
      </div>

      {/* Main Forgot Password Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/5">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 shadow-lg">
              <img
                className="w-12 h-12"
                src="https://udhhyog.com/img/favicon.ico?1717493245"
                alt="logo"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-300">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 py-4 bg-white/1 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Send Reset Link Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !email}
              className="w-full py-4 border border-white/20 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back to Login */}
            <button
              onClick={handleBackToLogin}
              className="w-full flex items-center justify-center py-3 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
