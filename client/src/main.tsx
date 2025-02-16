import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {BrowserRouter, Routes, Route} from "react-router"
import FeedPage from "./feedPage.tsx";
import LoginPage from "./LoginPage.tsx";
import { CreatePost } from "./createPost.tsx";
import CreateUser from "./createUser.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/feed" element={<FeedPage />}/>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/newUser" element={<CreateUser />}/>
        <Route path="/newPost" element={<CreatePost />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
