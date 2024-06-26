import TextEditor from "./components/TextEditor/TextEditor";
import { Routes, Navigate, Route } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/document/${uuidV4()}`} />} />
      <Route path="/document/:id" element={<TextEditor />} />
    </Routes>
  );
}

export default App;
