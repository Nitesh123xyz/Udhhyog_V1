// utileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissionList: [],
  accessToken: "",
  selectedProfile: null,
  searchLoading: false,
};

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
      state.selectedProfile = action.payload;
    },
    setSearchLoading(state, action) {
      state.searchLoading = action.payload;
    },
  },
});

export const {
  setPermissionList,
  setAccessToken,
  setProfileMenuList,
  setSearchLoading,
} = UtileSlice.actions;
export default UtileSlice.reducer;
