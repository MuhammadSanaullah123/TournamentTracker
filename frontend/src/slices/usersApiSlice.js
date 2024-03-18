import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:5000/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    getUserById: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getResetCode: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword/${data.id}/${data.token}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useGetAllUsersMutation,
  useGetUserByIdMutation,
  useGetResetCodeMutation,
  useResetPasswordMutation,
} = usersApiSlice;
