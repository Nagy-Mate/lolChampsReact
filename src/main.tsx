import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/AllChamps.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import OneChamp from "./pages/OneChamp.tsx";
import Login from "./pages/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/champ/:id" element={<OneChamp />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="colored" />
  </StrictMode>,
);
