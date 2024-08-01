import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Spinner from "../src/components/Spinner/Spinner.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>

      <Toaster position="top-rigth" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>
);
