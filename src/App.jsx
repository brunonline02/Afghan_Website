import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home";
import News from "./Components/News";
import Events from "./Components/Events";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="events" element={<Events />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
