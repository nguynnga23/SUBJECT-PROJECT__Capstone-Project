import { createSlice } from "@reduxjs/toolkit";
import { current_data } from "../../assets/sampleData";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    listDepartment: current_data.department_sources,
  },
  reducers: {
    addDepartment: (state, action) => {
      state.listDepartment.push(action.payload);
    },
    updateDepartment: (state, action) => {
      const { id, data } = action.payload;
      const index = state.listDepartment.findIndex((dep) => dep.id === id);

      if (index !== -1) {
        state.listDepartment[index] = {
          ...state.listDepartment[index],
          ...data,
        };
      }
    },
  },
});

export const { addDepartment, updateDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
