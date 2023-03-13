import React from "react";
import "./styles.css";

import { NavBar } from "./components/nav/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import Products from "./pages/Products";
import {Reports} from "./pages/Reports";
import { JobList } from "./pages/JobsList";
import { Login } from "./components/auth/Login";

export default function App() {
  return (
    
        <>
        <NavBar />
        <Routes>
          <Route path="/" exact element={< Reports />} />
          <Route path="/products" element={< Reports />} />
          <Route path="/jobs" element={< JobList />} />
          <Route path="/login" element={< Login />} />
        </Routes>
        </>
    
  );
}
