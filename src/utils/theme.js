import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ThemeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      localStorage.setItem("ThemeMode", action.payload);
      state.ThemeMode = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
