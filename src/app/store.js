import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import themeReducer from "../utils/theme";
import expendNavbarReducer from "../utils/ExpendNavbar";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ExpendNavbar: expendNavbarReducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authSlice.middleware),
});
