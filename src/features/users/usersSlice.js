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
    AddEmployee: builder.mutation({
      query: (payload) => ({
        url: "/add-employee",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    UpdateEmployee: builder.mutation({
      query: (payload) => ({
        url: "/update-employee",
        method: "POST",
        body: payload,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    DeleteEmployee: builder.mutation({
      query: (payload) => ({
        url: "/delete-employee",
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
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = UsersSlice;
