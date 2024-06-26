import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.tsx";
import CreateUgovor from "./components/ugovori/CreateUgovor.tsx";
import UgovorDetails from "./components/ugovori/UgovorDetails.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-ugovor" element={<CreateUgovor />} />
        <Route path="/ugovor/:id" element={<UgovorDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
