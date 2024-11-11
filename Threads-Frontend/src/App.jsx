import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import Disease from "./pages/Disease";
import Fertilizer from "./pages/Fertilizer";
import About from "./pages/About";
import Weather from "./pages/Weather";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  return (
    <Box position={"relative"} w="full">
      <Container maxW={pathname === "/"}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />

          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <>
                  <UserPage />
                </>
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/disease"
            element={user ? <Disease /> : <Navigate to="/auth" />}
          />
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/auth" />}
          />
          <Route
            path="/weather"
            element={user ? <Weather /> : <Navigate to="/" />}
          />
          <Route
            path="/fertilizer"
            element={user ? <Fertilizer /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
