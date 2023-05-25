import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import users from "../features/users/usersSlice";
import { api } from "../features/api/api";
import { listenerMiddleware } from "../features/auth/aurhMiddleware";
import formUserEditSlice from "../features/forms/formUserEditSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    users,
    formUserEditSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
