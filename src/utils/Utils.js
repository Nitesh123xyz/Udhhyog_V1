// utileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissionList: [],
  accessToken: "",
  previousNavigation: "Dashboard",
  userInfo: {},
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
    setPreviousOneNavigation(state, action) {
      state.previousNavigation = action.payload;
    },
    setUserRelatedInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const {
  setPermissionList,
  setAccessToken,
  setProfileMenuList,
  setSearchLoading,
  setPreviousOneNavigation,
  setUserRelatedInfo,
} = UtileSlice.actions;
export default UtileSlice.reducer;
