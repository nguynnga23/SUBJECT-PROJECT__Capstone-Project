import { createSlice } from "@reduxjs/toolkit";

const departmentSourceSlice = createSlice({
  name: "departmentSource",
  initialState: {
    list: [],
    currentDepartmentSource: {},
  },
  reducers: {
    setCurrentDepartmentSource: (state, action) => {
      state.currentDepartmentSource = action.payload;
    },
    addDepartmentSource: (state, action) => {
      state.list.push(action.payload);
    },

    updateDepartmentSource: (state, action) => {
      const { id, data } = action.payload;
      const index = state.list.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...data };
      }
    },

    deleteDepartmentSource: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((item) => item.documentId !== id);
    },

    setDepartmentSources: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {
  setCurrentDepartmentSource,
  addDepartmentSource,
  updateDepartmentSource,
  deleteDepartmentSource,
  setDepartmentSources,
} = departmentSourceSlice.actions;

export default departmentSourceSlice.reducer;
