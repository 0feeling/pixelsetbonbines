// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Games from "./pages/Games";
import Recommendations from "./pages/Recommendations";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/games" element={<Games />} />
      <Route path="/recommendations" element={<Recommendations />} />
    </Routes>
  </Router>
);
