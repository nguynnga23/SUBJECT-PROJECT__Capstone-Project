import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    admin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    setAdmin: (state, action) => {
      state.admin = action.payload;
    },

    logoutOfSlice: (state) => {
      state.user = null;
      state.token = null;
      state.admin = false;
    },
  },
});

export const { setUser, setToken, setAdmin, logoutOfSlice } = authSlice.actions;
export default authSlice.reducer;
