import TextEditor from "./components/TextEditor/TextEditor";
import { Routes, Navigate, Route } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Home from "../src/pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        <Route
          path="/docs"
          element={<Navigate to={`/document/${uuidV4()}`} />}
        />
        <Route path="/document/:id" element={<TextEditor />} />
      </Routes>
    </>
  );
}

export default App;
