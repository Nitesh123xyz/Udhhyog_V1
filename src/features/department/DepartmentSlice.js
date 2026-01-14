import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const DepartmentSlice = createApi({
  reducerPath: "departmentApi",
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
    GetAllDepartment: builder.query({
      query: (Token) => ({
        url: "/view-all-department",
        method: "POST",
        body: { token: Token },
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    ViewDepartment: builder.query({
      query: (teamInfo) => ({
        url: "/view-department",
        method: "POST",
        body: teamInfo,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    AddDepartment: builder.mutation({
      query: (teamInfo) => ({
        url: "/add-department",
        method: "POST",
        body: teamInfo,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    EditDepartment: builder.mutation({
      query: (teamData) => ({
        url: "/edit-department",
        method: "POST",
        body: teamData,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    AddUserDepartmentHierarchy: builder.mutation({
      query: (teamData) => ({
        url: "/add-user-dep-heirarchy",
        method: "POST",
        body: teamData,
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body,
      }),
    }),
    DeleteUserDepartmentHierarchy: builder.mutation({
      query: (teamData) => ({
        url: "/del-user-dep-heirarchy",
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
  useGetAllDepartmentQuery,
  useViewDepartmentQuery,
  useAddDepartmentMutation,
  useEditDepartmentMutation,
  // -----------------------------
  useAddUserDepartmentHierarchyMutation,
  useDeleteUserDepartmentHierarchyMutation,
} = DepartmentSlice;
