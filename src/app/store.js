import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { utilsSlice } from "../features/utils/utilsSlice";
import themeReducer from "../utils/theme";
import userReducer from "../utils/UserInfo";
import expendNavbarReducer from "../utils/ExpendNavbar";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    ExpendNavbar: expendNavbarReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [utilsSlice.reducerPath]: utilsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authSlice.middleware, utilsSlice.middleware),
});
