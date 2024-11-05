import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }), // Replace with your base URL
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/super-admin',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = api;
