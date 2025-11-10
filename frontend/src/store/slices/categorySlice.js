// store/slices/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    currentCategory: {},
  },
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
  },
});

export const { addCategory, setCurrentCategory, clearCurrentCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
