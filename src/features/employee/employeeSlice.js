import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const employeeSlice = createApi({
  reducerPath: "employeeApi",
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
    GetEmployees: builder.mutation({
      query: (Token) => ({
        url: "/employees",
        method: "POST",
        body: { token: Token, from_page: "dashboard" },
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
  useGetEmployeesMutation,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeSlice;
