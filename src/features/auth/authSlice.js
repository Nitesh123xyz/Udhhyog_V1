import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credential) => ({
        url: "/login",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credential) => ({
        url: "/forget-password",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
    }),
    OTPVerification: builder.mutation({
      query: (credential) => ({
        url: "/verify-otp",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
    }),
    ChangePassword: builder.mutation({
      query: (credential) => ({
        url: "/change-password",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
    }),
  }),
});

// Export hooks
export const {
  useLoginUserMutation,
  useForgotPasswordMutation,
  useOTPVerificationMutation,
  useChangePasswordMutation,
} = authSlice;
