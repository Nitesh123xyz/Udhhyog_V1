import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    responseHandler: async (response) => {
      const text = await response.text();
      try {
        return text ? JSON.parse(text) : null;
      } catch {
        return text || null;
      }
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credential) => ({
        url: "/login",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        headers: meta?.response?.headers,
        body, // original backend payload (may be null)
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credential) => ({
        url: "/forget-password",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0, // ✅ 202 here
        requestId: meta?.response?.headers?.get("x-request-id") ?? null,
        body,
      }),
    }),
    OTPVerification: builder.mutation({
      query: (credential) => ({
        url: "/verify-otp",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    ChangePassword: builder.mutation({
      query: (credential) => ({
        url: "/change-password",
        method: "POST",
        body: { ...credential, api_key: import.meta.env.VITE_API_KEY },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useForgotPasswordMutation,
  useOTPVerificationMutation,
  useChangePasswordMutation,
} = authSlice;
