import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    pages: {},
    total: 0,
  },
  reducers: {
    setPageData: (state, action) => {
      const { page, items } = action.payload;
      state.pages[page] = items;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setPageData, setTotal } = articleSlice.actions;
export default articleSlice.reducer;
