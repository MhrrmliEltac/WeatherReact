import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WeatherCard from "./components/WeatherCard";
import SearchResult from "./components/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<WeatherCard />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
