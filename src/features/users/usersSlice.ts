import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/types";
import { usersApi } from "../api/usersAPI";
import { RootState } from "../../store/store";

interface InitialState {
  users: UserType[] | null;
}

const initialState: InitialState = {
  users: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getAllUsers.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const selectUsers = (state: RootState) => state.users.users;
