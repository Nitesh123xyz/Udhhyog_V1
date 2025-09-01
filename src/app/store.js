import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { utilsSlice } from "../features/utils/utilsSlice";
import { pagePermissionSlice } from "../features/permission_page/page_permission";
import expendNavbarReducer from "../utils/ExpendNavbar";
export const store = configureStore({
  reducer: {
    ExpendNavbar: expendNavbarReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [utilsSlice.reducerPath]: utilsSlice.reducer,
    [pagePermissionSlice.reducerPath]: pagePermissionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      utilsSlice.middleware,
      pagePermissionSlice.middleware
    ),
});
