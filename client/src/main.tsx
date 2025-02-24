import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import {BrowserRouter, Routes, Route} from "react-router"
import FeedPage from "./pages/FeedPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { CreatePost } from "./pages/CreatePost.tsx";
import CreateUser from "./pages/CreateUser.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/feed" element={<FeedPage />}/>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/newUser" element={<CreateUser />}/>
        <Route path="/newPost" element={<CreatePost />}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
