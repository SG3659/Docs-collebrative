import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  error: null,
  loading: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
   
  },
});
export const { setUser, signInSuccess, signInFailure } = userSlice.actions;
