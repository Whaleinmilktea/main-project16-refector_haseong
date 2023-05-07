import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import StudyList from "./pages/StudyList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/studylist" element={<StudyList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
