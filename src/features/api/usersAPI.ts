import { User } from "../../types/types";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<string, User>({
      query: (employee) => ({
        url: `/users/edit/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
    }),
    removeUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/users/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addUser: builder.mutation<User, User>({
      query: (employee) => ({
        url: "/users/add",
        method: "POST",
        body: employee,
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
} = usersApi;

export const {
  endpoints: { getAllUsers, getUser, editUser, removeUser, addUser },
} = usersApi;
