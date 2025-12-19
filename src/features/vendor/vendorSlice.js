import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decodePayload, encodePayload } from "../../Middlewares/EncodeDecode";

export const VendorSlice = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    responseHandler: async (response) => {
      return await response.text();
    },
  }),
  endpoints: (builder) => ({
    ViewVendor: builder.query({
      query: (preferenceInfo) => ({
        url: "/vendor",
        method: "POST",
        body: encodePayload(preferenceInfo),
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body: decodePayload(body),
      }),
    }),

    AddVendor: builder.mutation({
      query: (addVendorInfo) => ({
        url: "/vendor",
        method: "POST",
        body: encodePayload(addVendorInfo),
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body: decodePayload(body),
      }),
    }),
    AddVendorAdditionalDetails: builder.mutation({
      query: (addVendorInfo) => ({
        url: "/vendor",
        method: "POST",
        body: encodePayload(addVendorInfo),
      }),
      transformResponse: (body, meta) => ({
        status: meta?.response?.status ?? 0,
        body: decodePayload(body),
      }),
    }),
  }),
});

export const {
  useViewVendorQuery,
  useAddVendorMutation,
  useAddVendorAdditionalDetailsMutation,
} = VendorSlice;
