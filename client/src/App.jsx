import TextEditor from "./components/TextEditor/TextEditor";
import { Routes, Navigate, Route } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import Header from "./components/Header/header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={`/document/${uuidV4()}`} />} />
        <Route path="/document/:id" element={<TextEditor />} />
      </Routes>
    </>
  );
}

export default App;
