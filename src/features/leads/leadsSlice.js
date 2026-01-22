import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decodePayload, encodePayload } from "../../Middlewares/EncodeDecode";

export const LeadsSlice = createApi({
  reducerPath: "leadsApi",
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
  tagTypes: ["Leads"],
  endpoints: (builder) => ({
    ViewLeads: builder.query({
      query: (vendorInfo) => ({
        url: "/leads",
        method: "POST",
        body: encodePayload(vendorInfo),
      }),
      transformResponse: (body, meta) => {
        return {
          status: meta?.response?.status ?? 0,
          body: decodePayload(body?.data),
        };
      },
      providesTags: ["Leads"],
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

    UpdateVendorBasic: builder.mutation({
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

    UpdateVendorContact: builder.mutation({
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

    UpdateVendorAddress: builder.mutation({
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

    UpdateVendorDocument: builder.mutation({
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

    UpdateVendorBank: builder.mutation({
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
  useViewLeadsQuery,
  useViewVendorAdditionalInfoQuery,
  useAddVendorMutation,
  useAddVendorAdditionalDetailsMutation,

  // -----------------------------------

  useUpdateVendorBasicMutation,
  useUpdateVendorContactMutation,
  useUpdateVendorAddressMutation,
  useUpdateVendorDocumentMutation,
  useUpdateVendorBankMutation,
} = LeadsSlice;
