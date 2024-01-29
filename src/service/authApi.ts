// api.js (or wherever you define your api)
import * as z from "zod";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginSchema } from "./../components/login-form";

export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000", // Use the proxy path
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: z.infer<typeof LoginSchema>) => {
        return {
          url: "/login", // The URL relative to the proxy path
          method: "GET",
          headers: {
            data: JSON.stringify(body),
          },
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApis;
