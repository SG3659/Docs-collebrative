import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  error: null,
  loading: false,
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const { signInSuccess, signInFailure } = loginSlice.actions;
