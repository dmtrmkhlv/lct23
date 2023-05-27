import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersAPI";
import { RootState } from "../../store/store";
import { UserApplyType } from "../../types/UserApplyType";

interface InitialState {
  apply: UserApplyType | null;
}

const initialState: InitialState = {
  apply: null,
};

const slice = createSlice({
  name: "apply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getUserApply.matchFulfilled,
      (state, action) => {
        state.apply = action.payload;
      }
    );
    builder.addMatcher(
      usersApi.endpoints.addUserApply.matchFulfilled,
      (state, action) => {
        state.apply = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const selectUsersApply = (state: RootState) => state.apply.apply;
