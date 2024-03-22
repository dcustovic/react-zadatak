import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./components/Article";
import Home from "./components/Home";
import CreateUgovor from "./components/ugovori/CreateUgovor";

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
