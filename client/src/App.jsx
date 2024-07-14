import TextEditor from "./components/TextEditor/TextEditor";
import { Routes, Navigate, Route } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Home from "../src/pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PublicRoute from "./components/PRoutes/publicRoutes";
import PrivateRoute from "./components/PRoutes/protectedRoute";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner/Spinner";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import EmailSent from "./pages/EmailSent";
import UpdatePassword from "./pages/UpdatePassword";
function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <div className="relative ">
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
                <TextEditor />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
