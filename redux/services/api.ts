import { getToken } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["SuperAdmin"], // Define your tag types here
  endpoints: (builder) => ({
    // super admin
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/super-admin",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    getAllEmployees: builder.query({
      query: () => "/super-admin",
      providesTags: ["SuperAdmin"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/super-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    // auth endpoints
    login: builder.mutation({
      query: (newUser) => ({
        url: "/super-admin/auth/login",
        method: "POST",
        body: newUser,
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: "/super-admin/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/super-admin/auth/verify-reset-token",
        method: "PATCH",
        body: otpData,
      }),
    }),
    resetPassord: builder.mutation({
      query: (data) => ({
        url: "/super-admin/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // tenants endpoints
    getAllTenants: builder.query({
      query: ({ page = 1, limit = 2 }) =>
        `/tenants/all/?page=${page}&limit=${limit}`,
    }),
    
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  useResetPassordMutation,
  useGetAllTenantsQuery,
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation
} = api;
