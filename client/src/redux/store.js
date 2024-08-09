import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { userSlice } from "./userSlice";
import { docsSlice } from "./docsSlice";
import { loginSlice } from "./loginSlice";
const rootReducer = combineReducers({
  loader: loaderSlice.reducer,
  user: userSlice.reducer,
  docs: docsSlice.reducer,
  login: loginSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
