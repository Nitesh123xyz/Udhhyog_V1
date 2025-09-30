import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const pagePermissionSlice = createApi({
  reducerPath: "PagePermissionApi",
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
    pagePermissionList: builder.mutation({
      query: (Token) => ({
        url: "/page-permission",
        method: "POST",
        body: { token: Token, from_page: "dashboard" },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    UpdatePagePermission: builder.mutation({
      query: (payload) => ({
        url: "/update-permission",
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
  usePagePermissionListMutation,
  useUpdatePagePermissionMutation,
} = pagePermissionSlice;
