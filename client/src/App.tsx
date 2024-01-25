import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/MyPage";
import StudyPost from "./pages/StudyPost";
import "./App.css";
import StudyList from "./pages/StudyList";
import StudyContent from "./pages/StudyContent";
import GNB from "./components/gnb/GNB";
import Footer from "./components/Footer";
import ProfileCalendar from "./pages/ProfileCalendar";
import Redirect from "./pages/Redirect";
import useRefreshToken from "./hooks/useRefreshToken";
import Modal from "react-modal";
import Home from "./pages/Home";
import StudyUpdate from "./pages/StudyUpdate";
import ProfileStudyManage from "./pages/StudyManage";
import { docRef } from "./apis/Test_Firebase";
import { useEffect } from "react";
import { auth } from "./firebase";

const queryClient = new QueryClient();

Modal.setAppElement("#root");
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

function AppContent() {

  // useEffect(() => {
  //   console.log(docRef)
  //   docRef.forEach((doc) => {
  //     console.log(doc.data());
  //   });
  // }, []);

  // // useEffect(() => {
  // //   console.log(docRef())
  // // }, [])

  // console.log( auth )

  const fetched = useRefreshToken(); // 이 코드 때문에, 개발서버에서 렌더링이 되지 않고 있음!
  return (
    <>
      {fetched && (
        <>
          <GNB />
          <GlobalStyle />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route path="/profile/*" element={<Mypage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/oauth/redirect" element={<Redirect />} />
            <Route path="/studylist" element={<StudyList />} />
            <Route path={`/studycontent/:id`} element={<StudyContent />} />
            <Route path="/studypost" element={<StudyPost />} />
            <Route path="/calendar" element={<ProfileCalendar />} />
            <Route path={`/edit/:id`} element={<StudyUpdate />} />
            <Route path="/:id" element={<ProfileStudyManage />} />
            <Route />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}
export default App;
