import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logoutOfSlice: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutOfSlice } = authSlice.actions;
export default authSlice.reducer;
