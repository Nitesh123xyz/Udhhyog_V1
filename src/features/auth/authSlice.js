import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.udhhyog.com/v1" }),
  endpoints: (builder) => ({
    // get user profile
    getUsers: builder.query({
      query: () => "/test",
    }),

    checkingUser: builder.mutation({
      query: (credentials) => ({
        url: "/initiate",
        method: "POST",
        body: credentials,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // 👇 Another GET endpoint
    getProfile: builder.query({
      query: () => "/profile",
    }),
  }),
});

// Export hooks
export const {
  useGetUsersQuery,
  useGetProfileQuery,
  useCheckingUserMutation,
  useLoginUserMutation,
} = authSlice;
