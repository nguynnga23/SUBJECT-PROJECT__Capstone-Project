import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    currentDepartment: {},
  },
  reducers: {
    setCurrentDepartment: (state, action) => {
      state.currentDepartment = action.payload;
    },
  },
});

export const { setCurrentDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
