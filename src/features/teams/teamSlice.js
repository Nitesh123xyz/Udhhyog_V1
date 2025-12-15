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
    AddTeam: builder.mutation({
      query: (teamInfo) => ({
        url: "/add-team",
        method: "POST",
        body: teamInfo,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    EditTeam: builder.mutation({
      query: (teamInfo) => ({
        url: "/edit-team",
        method: "POST",
        body: teamInfo,
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
    AddUserTeamHead: builder.mutation({
      query: (teamData) => ({
        url: "/add-user-team-head",
        method: "POST",
        body: teamData,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    DeleteUserTeamHead: builder.mutation({
      query: (teamData) => ({
        url: "/del-user-team-head",
        method: "POST",
        body: teamData,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    AddTeamManager: builder.mutation({
      query: (teamData) => ({
        url: "/add-team-manager",
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

export const {
  useAddTeamMutation,
  useEditTeamMutation,
  useGetAllTeamQuery,
  useViewTeamQuery,
  useAddUserTeamHeadMutation,
  useDeleteUserTeamHeadMutation,
  // --------------------------
  useAddTeamManagerMutation,
} = TeamsSlice;
