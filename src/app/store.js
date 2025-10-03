import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { utilsSlice } from "../features/utils/utilsSlice";
import { pagePermissionSlice } from "../features/permission_page/page_permission";
import { employeeSlice } from "../features/employee/employeeSlice";
import expendNavbarReducer from "../utils/ExpendNavbar";
import UtileSliceReducer from "../utils/Utils";
export const store = configureStore({
  reducer: {
    ExpendNavbar: expendNavbarReducer,
    UtileSlice: UtileSliceReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [utilsSlice.reducerPath]: utilsSlice.reducer,
    [employeeSlice.reducerPath]: employeeSlice.reducer,
    [pagePermissionSlice.reducerPath]: pagePermissionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      utilsSlice.middleware,
      employeeSlice.middleware,
      pagePermissionSlice.middleware
    ),
});
