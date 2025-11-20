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

    setToken: (state, action) => {
      state.token = action.payload;
    },

    logoutOfSlice: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, logoutOfSlice } = authSlice.actions;
export default authSlice.reducer;
