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
      return (await response.json()) || response.text();
    },
  }),
  tagTypes: ["Vendor"],
  endpoints: (builder) => ({
    ViewVendor: builder.query({
      query: (vendorInfo) => ({
        url: "/vendor",
        method: "POST",
        body: encodePayload(vendorInfo),
      }),
      transformResponse: (body, meta) => {
        return {
          status: meta?.response?.status ?? 0,
          body: decodePayload(body?.data),
        };
      },
      providesTags: ["Vendor"],
    }),
    ViewVendorAdditionalInfo: builder.query({
      query: (vendorInfo) => ({
        url: "/vendor",
        method: "POST",
        body: encodePayload(vendorInfo),
      }),
      transformResponse: (body, meta) => {
        return {
          status: meta?.response?.status ?? 0,
          body: decodePayload(body?.data),
        };
      },
      providesTags: ["Vendor"],
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
      invalidatesTags: ["Vendor"],
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
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useViewVendorQuery,
  useViewVendorAdditionalInfoQuery,
  useAddVendorMutation,
  useAddVendorAdditionalDetailsMutation,
} = VendorSlice;
