import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }), // Replace with your base URL
  endpoints: (builder) => ({
    // super admin endpoints
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/super-admin",
        method: "POST",
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (newUser) => ({
        url: "/super-admin/auth/login",
        method: "POST",
        body: newUser,
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: "/super-admin/auth/forget-password", // Adjust endpoint as necessary
        method: "POST",
        body: email, // Send email in the body for password reset request
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/super-admin/auth/verify-reset-token", // Adjust endpoint as necessary
        method: "PATCH",
        body: otpData,
      }),
    }),
    resetPassord: builder.mutation({
      query: (data) => ({
        url: "/super-admin/auth/reset-password", // Adjust endpoint as necessary
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  useResetPassordMutation,
} = api;
