import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import GlobalStyle from "./GlobalStyle";
import SignUp from "./pages/Sign-Up";
import "./App.css";
import GNB from "./layouts/GNB";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/Sign-In";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import Loading from "./components/atoms/loading";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider>
          <AppContent />
        </ChakraProvider>
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
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* 
            <Route path="/studylist" element={<StudyList />} />
            <Route path={`/studycontent/:id`} element={<StudyContent />} />
            <Route path="/studypost" element={<StudyPost />} />
            <Route path="/calendar" element={<ProfileCalendar />} />
            <Route path={`/edit/:id`} element={<StudyUpdate />} />
            <Route path="/:id" element={<ProfileStudyManage />} /> */}
          <Route />
        </Routes>
        <Footer />
        {/* <Loading /> */}
      </>
    </>
  );
}
export default App;