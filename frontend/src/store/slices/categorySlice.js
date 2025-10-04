// store/slices/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
