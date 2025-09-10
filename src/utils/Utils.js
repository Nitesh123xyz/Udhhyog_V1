// utileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { permissionList: [] };

const UtileSlice = createSlice({
  name: "UtileSlice",
  initialState,
  reducers: {
    setPermissionList(state, action) {
      state.permissionList = action.payload;
    },
  },
});

export const { setPermissionList } = UtileSlice.actions;
export default UtileSlice.reducer;
