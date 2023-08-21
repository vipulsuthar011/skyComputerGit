import "./App.css";
import "@fontsource/raleway";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SideHeaderWrapper from "./components/side/sideHeaderWrapper";
import SignIn from "./pages/signIn/signIn";
import Home from "./components/home/home";
import { ToastContainer, toast } from 'react-toastify';
import { AuthenticatedRoute, UnauthenticatedRoute } from "./authenticatedRoutes";


function App() {
  return (
    <>

      <BrowserRouter>
      <ToastContainer/>
      <Routes>
      <Route path="/" element={<UnauthenticatedRoute element={<SignIn />} />} />
        <Route path="/login" element={<UnauthenticatedRoute element={<SignIn />} />} />
        <Route
          path="/admin/*"
          element={<AuthenticatedRoute element={<SideHeaderWrapper />} />}
        />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
