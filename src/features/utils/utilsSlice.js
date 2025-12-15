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
      query: (Token) => ({
        url: "/main-menu",
        method: "POST",
        body: { token: Token },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),

    allProfileMenu: builder.mutation({
      query: (Token) => ({
        url: "/employee-menu",
        method: "POST",
        body: { token: Token },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),

    listDepartMent: builder.query({
      query: (Token) => ({
        url: "/list-department",
        method: "POST",
        body: { token: Token },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    reVerifySession: builder.mutation({
      query: (reVerifyInfo) => ({
        url: "/re-verify-session",
        method: "POST",
        body: reVerifyInfo,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    navigationCollector: builder.mutation({
      query: (navigationInfo) => ({
        url: "/navigation",
        method: "POST",
        body: navigationInfo,
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
  useAllProfileMenuMutation,
  useListDepartMentQuery,
  useReVerifySessionMutation,
  useNavigationCollectorMutation,
} = utilsSlice;
