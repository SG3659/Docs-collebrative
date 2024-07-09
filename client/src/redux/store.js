import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { loaderSlice } from "./loaderSlice";
const rootReducer = combineReducers({
  loader: loaderSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
