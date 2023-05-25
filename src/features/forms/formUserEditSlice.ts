import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import { RootState } from "../../store/store";

interface InitialState {
  userFormData: User | null;
  //   users: string;
}

const initialState: InitialState = {
  userFormData: null,
};

const formUserEditSlice = createSlice({
  name: "formUserEditSlice",
  initialState,
  reducers: {
    clear: () => initialState,
    initFormValue: (state, action: PayloadAction<any>) => {
      state.userFormData = action.payload;
    },
    setFormValue: (state, action: PayloadAction<any>) => {
      state.userFormData = null;
      state.userFormData = action.payload;
    },
  },
});

export const { clear, setFormValue, initFormValue } = formUserEditSlice.actions;

export default formUserEditSlice.reducer;

export const selectFormUserEditSlice = (state: RootState) =>
  state.formUserEditSlice.userFormData;
