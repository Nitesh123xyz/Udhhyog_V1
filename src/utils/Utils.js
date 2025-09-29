// utileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { permissionList: [], accessToken: "" };

const UtileSlice = createSlice({
  name: "UtileSlice",
  initialState,
  reducers: {
    setPermissionList(state, action) {
      state.permissionList = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload || "";
    },
    clearAuth(state) {
      state.accessToken = "";
    },
  },
});

export const { setPermissionList, setAccessToken, clearAuth } =
  UtileSlice.actions;
export default UtileSlice.reducer;
