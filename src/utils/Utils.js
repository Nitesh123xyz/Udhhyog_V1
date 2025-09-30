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
    setProfileMenuList(state, action) {
      state.profileMenuList = action.payload;
    },
  },
});

export const { setPermissionList, setAccessToken, setProfileMenuList } =
  UtileSlice.actions;
export default UtileSlice.reducer;
