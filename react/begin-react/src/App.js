import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import DialogPage from "./DialogPage";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dialog">Dialog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dialog" element={<DialogPage />} />
      </Routes>
    </div>
  );
}

export default App;
