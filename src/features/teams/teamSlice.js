import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const TeamsSlice = createApi({
  reducerPath: "teamsApi",
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
    GetAllTeam: builder.query({
      query: (Token) => ({
        url: "/view-all-team",
        method: "POST",
        body: { token: Token },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    ViewTeam: builder.query({
      query: (teamData) => ({
        url: "/view-team",
        method: "POST",
        body: teamData,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
  }),
});

export const { useGetAllTeamQuery, useViewTeamQuery } = TeamsSlice;
