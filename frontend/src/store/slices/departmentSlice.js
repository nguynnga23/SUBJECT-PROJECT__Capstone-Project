import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    currentDepartment: {},
    departments: [],
  },
  reducers: {
    setListDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setCurrentDepartment: (state, action) => {
      state.currentDepartment = action.payload;
    },
  },
});

export const { setListDepartments, setCurrentDepartment } =
  departmentSlice.actions;
export default departmentSlice.reducer;
