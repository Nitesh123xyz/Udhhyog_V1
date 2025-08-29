import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const UserInfoSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = UserInfoSlice.actions;
export default UserInfoSlice.reducer;
