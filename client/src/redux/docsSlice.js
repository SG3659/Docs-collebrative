import { createSlice } from "@reduxjs/toolkit";
export const docsSlice = createSlice({
  name: "docs",
  initialState: {
    docs: null,
  },
  reducers: {
    setDocs: (state, action) => {
      state.docs = action.payload;
    },
  },
});
export const { setDocs } = docsSlice.actions;
