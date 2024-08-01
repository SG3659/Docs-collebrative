import { lazy, useState } from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Spinner from "./components/Spinner/Spinner";
import PublicRoute from "./components/PRoutes/publicRoutes";
import PrivateRoute from "./components/PRoutes/protectedRoute";
import { useSelector } from "react-redux";

const Home = lazy(() => import("../src/pages/home"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const PasswordResetSuccess = lazy(() => import("./pages/PasswordResetSuccess"));
const EmailSent = lazy(() => import("./pages/EmailSent"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const TextEditor = lazy(() => import("./components/TextEditor/TextEditor"));

function App() {
  const { loading } = useSelector((state) => state.loader);
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative z-0 ">
      <div className="absolute">{loading && <Spinner />}</div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/Signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/password-reset-success"
          element={
            <PublicRoute>
              <PasswordResetSuccess />
            </PublicRoute>
          }
        />
        <Route
          path="/email-sent"
          element={
            <PublicRoute>
              <EmailSent />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:userId/:resetString"
          element={
            <PublicRoute>
              <UpdatePassword />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route path="/">
          <Route
            path="docs"
            element={<Navigate to={`/document/${uuidV4()}`} />}
          />
          <Route
            path="document/:id"
            element={
              <PrivateRoute>
                <TextEditor toggle={toggle} setToggle={setToggle} />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
