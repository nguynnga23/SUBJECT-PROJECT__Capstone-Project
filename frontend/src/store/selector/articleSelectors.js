import { createSelector } from "@reduxjs/toolkit";

// input selector
const selectPages = (state) => state.article.pages;

// memoized selector
export const selectCurrentPageData = createSelector(
  [selectPages, (_, currentPage) => currentPage],
  (pages, currentPage) => pages[currentPage] || []
);
