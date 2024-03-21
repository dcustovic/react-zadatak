import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from './components/Article';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
