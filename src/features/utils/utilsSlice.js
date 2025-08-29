import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const utilsSlice = createApi({
  reducerPath: "utilsApi",
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
    leftSideNavigationMenu: builder.mutation({
      query: (credential) => ({
        url: "/main-menu",
        method: "POST",
        body: credential,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    pagePermissionList: builder.mutation({
      query: (credential) => ({
        url: "/page-permission",
        method: "POST",
        body: credential,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
  }),
});

export const {
  useLeftSideNavigationMenuMutation,
  usePagePermissionListMutation,
} = utilsSlice;
