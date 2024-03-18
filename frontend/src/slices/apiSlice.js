import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers, { getState }) => {
    if (JSON.parse(sessionStorage.getItem("token") === "true")) {
      headers.set("Authorization", `Bearer ${process.env.REACT_APP_Token}`);
    }

    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    /*    if (token) {
      headers.set("Authorization", `Bearer YOUR_API_TOKEN ${process.env.REACT_APP_Token}`,
      );
    } */

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Tournament", "User"],
  endpoints: (builder) => ({}),
});
