import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { loaderSlice } from "./loaderSlice";
import { userSlice } from "./userSlice";
const rootReducer = combineReducers({
  loader: loaderSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
