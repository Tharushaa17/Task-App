import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  error: null,
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskDeleteStart: (state) => {
      state.loading = true;
    },
    taskDeleteSuccess: (state, action) => {
      state.success = action.payload;
      state.loading = false;
      state.error = null;
    },
    taskDeleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearMessage: (state) => {
      state.success = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  taskDeleteStart,
  taskDeleteSuccess,
  taskDeleteFailure,
  clearMessage,
} = taskSlice.actions;
export default taskSlice.reducer;
