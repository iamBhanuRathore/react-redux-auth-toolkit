// api.js (or wherever you define your api)
import * as z from "zod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginSchema } from "./../components/login-form";
import { RegisterSchema } from "./../components/register-form";

export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    // for letting hte user log in
    loginUser: builder.mutation({
      query: (body: z.infer<typeof LoginSchema>) => {
        return {
          url: "/login",
          method: "GET",
          headers: {
            data: JSON.stringify(body),
          },
        };
      },
    }),
    // for registering a new user
    registerUser: builder.mutation({
      query: (body: z.infer<typeof RegisterSchema>) => {
        return {
          url: "/login",
          method: "GET",
          headers: {
            data: JSON.stringify(body),
          },
        };
      },
    }),
    // for verifing a user if its already logged in and getiing the necessary details
    verifyUser: builder.mutation({
      query: (token: string) => {
        return {
          url: "/verify-token",
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyUserMutation,
} = authApis;
