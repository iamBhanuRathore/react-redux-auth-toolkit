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
  tagTypes: ["verify"],
  endpoints: (builder) => ({
    // for letting the user log in
    loginUser: builder.mutation({
      query: (body: z.infer<typeof LoginSchema>) => {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["verify"],
    }),
    // for registering a new user
    registerUser: builder.mutation({
      query: (body: z.infer<typeof RegisterSchema>) => {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
    }),
    // for verifing a user if its already logged in and POSTiing the necessary details
    verifyUser: builder.query({
      query: (token: string) => {
        return {
          url: "/verify",
          method: "POST",
          headers: {
            token,
          },
        };
      },
      providesTags: ["verify"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyUserQuery,
} = authApis;
