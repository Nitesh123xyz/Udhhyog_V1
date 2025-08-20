import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PinBar: false,
  MobileNav: false,
  CurrentLabel: {
    ParentTabLabel: "",
    ChildTabLabel: "",
  },
};

const ExpendNavbar = createSlice({
  name: "ExpendNavbar",
  initialState,
  reducers: {
    PinBar(state) {
      state.PinBar = !state.PinBar;
    },
    NavarMobileOpenClose(state) {
      state.MobileNav = !state.MobileNav;
    },
    trackCurrentTabAndLink(state, action) {
      state.CurrentLabel = {
        ...state.CurrentLabel,
        ...action.payload,
      };
      localStorage.setItem(
        "CurrentLabel",
        JSON.stringify({ ...state.CurrentLabel, ...action.payload })
      );
    },
  },
});

export const { PinBar, NavarMobileOpenClose, trackCurrentTabAndLink } =
  ExpendNavbar.actions;
export default ExpendNavbar.reducer;
