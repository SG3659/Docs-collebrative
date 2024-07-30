import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { userSlice } from "./userSlice";
import { docsSlice } from "./docsSlice";
const rootReducer = combineReducers({
  loader: loaderSlice.reducer,
  user: userSlice.reducer,
  docs: docsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
