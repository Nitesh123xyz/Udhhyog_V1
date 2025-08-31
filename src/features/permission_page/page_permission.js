import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/AuthToken";

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
      query: () => ({
        url: "/page-permission",
        method: "POST",
        body: { token: getToken(), from_page: "dashboard" },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    UpdatePagePermission: builder.mutation({
      query: (payload) => ({
        url: "/page-permission/update",
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
