import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const UsersSlice = createApi({
  reducerPath: "usersApi",
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
    GetUsers: builder.mutation({
      query: (Token) => ({
        url: "/users",
        method: "POST",
        body: { token: Token, from_page: "users" },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    SearchUsers: builder.mutation({
      query: (searchData) => ({
        url: "/search-user",
        method: "POST",
        body: searchData,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    QueryUsers: builder.mutation({
      query: (searchData) => ({
        url: "/query-user",
        method: "POST",
        body: searchData,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    UsersAdditionalDetails: builder.query({
      query: (payload) => ({
        url: "/user-details",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    AddUser: builder.mutation({
      query: (payload) => ({
        url: "/add-user",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),

    UpdateUserBasic: builder.mutation({
      query: (payload) => ({
        url: "/upd-user-basic",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    UpdateUserExperience: builder.mutation({
      query: (payload) => ({
        url: "/upd-user-exp",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    UpdateUserFamily: builder.mutation({
      query: (payload) => ({
        url: "/upd-user-family",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    UpdateUserEducation: builder.mutation({
      query: (payload) => ({
        url: "/upd-user-education",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),

    UpdateUserEmergency: builder.mutation({
      query: (payload) => ({
        url: "/upd-user-emergency",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),

    DeleteUser: builder.mutation({
      query: (payload) => ({
        url: "/del-user-data",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useSearchUsersMutation,
  useQueryUsersMutation,
  useUsersAdditionalDetailsQuery,
  useAddUserMutation,
  useUpdateUserBasicMutation,
  useUpdateUserFamilyMutation,
  useUpdateUserExperienceMutation,
  useUpdateUserEducationMutation,
  useUpdateUserEmergencyMutation,
  useDeleteUserMutation,
} = UsersSlice;
