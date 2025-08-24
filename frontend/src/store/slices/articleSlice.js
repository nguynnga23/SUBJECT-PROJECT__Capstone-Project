import { createSlice } from "@reduxjs/toolkit";
import { list } from "../../assets/sampleData";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    listMarked: [1, 2],
    allArticles: list,
  },
  reducers: {
    markArticle: (state, action) => {
      const { id } = action.payload || {};
      if (id && !state.listMarked.includes(id)) {
        state.listMarked.push(id);
      }
    },
    removeMarked: (state, action) => {
      const { id } = action.payload || {};
      state.listMarked = state.listMarked.filter((item) => item !== id);
    },
    clearMarked: (state) => {
      state.listMarked = [];
    },
  },
});

export const { markArticle, removeMarked, clearMarked } = articleSlice.actions;
export default articleSlice.reducer;
