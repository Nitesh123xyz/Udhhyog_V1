import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ThemeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.ThemeMode = state.ThemeMode === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.ThemeMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
