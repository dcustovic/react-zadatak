import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./components/Article";
import Home from "./components/Home.tsx";
import CreateUgovor from "./components/ugovori/CreateUgovor.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/create-ugovor" element={<CreateUgovor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;