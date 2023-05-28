import { UserApplyType } from "../../types/UserApplyType";
import { UserType } from "../../types/types";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUser: builder.query<UserType, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<string, UserType>({
      query: (user) => ({
        url: `/users/edit/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),
    removeUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/users/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addUser: builder.mutation<UserType, UserType>({
      query: (user) => ({
        url: "/users/add",
        method: "POST",
        body: user,
      }),
    }),
    getUserApply: builder.query<UserApplyType, string>({
      query: (id) => ({
        url: `/users/apply/${id}`,
        method: "GET",
      }),
    }),
    getAllUsersApply: builder.query<UserApplyType[], void>({
      query: () => ({
        url: `/users-all/apply/`,
        method: "GET",
      }),
    }),
    addUserApply: builder.mutation<UserApplyType, UserApplyType>({
      query: (apply) => ({
        url: "/users/apply/add",
        method: "POST",
        body: apply,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useEditUserMutation,
  useRemoveUserMutation,
  useGetUserApplyQuery,
  useAddUserApplyMutation,
  useGetAllUsersApplyQuery,
} = usersApi;

export const {
  endpoints: {
    getAllUsers,
    getUser,
    editUser,
    removeUser,
    addUser,
    getUserApply,
    addUserApply,
    getAllUsersApply,
  },
} = usersApi;
