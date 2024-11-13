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
  tagTypes: ["SuperAdmin", "Tenants"], // Define your tag types here
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
    updateEmployee: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/super-admin/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    // In your api file
    getAllEmployees: builder.query({
      query: ({ page = 1, limit = 5 }) =>
        `/super-admin?page=${page}&limit=${limit}`,
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
    searchTenants: builder.query({
      query: ({ searchTerm }) =>
        `/tenants/search?search=${searchTerm}`,
      providesTags: ["Tenants"],
    }),
    // In your api file
    deleteTenant: builder.mutation({
      query: (id) => ({
        url: `/tenants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tenants"],
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
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useSearchTenantsQuery,
  useDeleteTenantMutation,
} = api;
