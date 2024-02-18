import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logOutUserStart: (state) => {
      state.loading = true;
    },
    logOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    logOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  logInStart,
  logInSuccess,
  logInFailure,
  logOutUserStart,
  logOutUserSuccess,
  logOutUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
