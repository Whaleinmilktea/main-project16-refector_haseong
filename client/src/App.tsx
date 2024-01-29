import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import SignUp from "./pages/Sign-Up";
import Mypage from "./pages/MyPage";
import StudyPost from "./pages/StudyPost";
import "./App.css";
import StudyList from "./pages/StudyList";
import StudyContent from "./pages/StudyContent";
import GNB from "./layouts/GNB";
import Footer from "./layouts/Footer";
import ProfileCalendar from "./pages/ProfileCalendar";
import Redirect from "./pages/Redirect";
import Modal from "react-modal";
import Home from "./pages/Home";
import StudyUpdate from "./pages/StudyUpdate";
import ProfileStudyManage from "./pages/StudyManage";
import SignIn from "./pages/Sign-in";

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
  return (
    <>
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
            {/* <Route path="/profile/*" element={<Mypage />} /> */}
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/oauth/redirect" element={<Redirect />} />
            <Route path="/studylist" element={<StudyList />} />
            <Route path={`/studycontent/:id`} element={<StudyContent />} />
            <Route path="/studypost" element={<StudyPost />} />
            <Route path="/calendar" element={<ProfileCalendar />} />
            <Route path={`/edit/:id`} element={<StudyUpdate />} />
            <Route path="/:id" element={<ProfileStudyManage />} /> */}
            <Route />
          </Routes>
          <Footer />
        </>
    </>
  );
}
export default App;
